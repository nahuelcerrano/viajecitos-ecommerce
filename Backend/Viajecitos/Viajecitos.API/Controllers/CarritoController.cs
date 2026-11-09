using Microsoft.AspNetCore.Mvc;
using Viajecitos.Core.Interfaces;
using Viajecitos.Core.Entities;
using Viajecitos.API.Dtos;

namespace Viajecitos.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CarritoController : ControllerBase
    {
        private readonly ICarritoRepository _carritoRepository;
        private readonly IDestinoRepository _destinoRepository;
        private readonly IHotelRepository _hotelRepository;

        public CarritoController (
            ICarritoRepository carritoRepository,
            IDestinoRepository destinoRepository,
            IHotelRepository hotelRepository)
        {
            _carritoRepository = carritoRepository;
            _destinoRepository = destinoRepository;
            _hotelRepository = hotelRepository;
        }

        // POST: api/Carrito -> crea un carrito vacio
        [HttpPost]
        public async Task<ActionResult<CarritoDto>> CrearCarrito()
        {
            var carrito = await _carritoRepository.CreateAsync();
            return CreatedAtAction(nameof(GetCarrito), new { id = carrito.Id}, MapCarrito(carrito));
        }

        // GET: api/Carrito/{id} -> obtiene el carrito con sus items
        [HttpGet("{id}")]
        public async Task<ActionResult<CarritoDto>> GetCarrito(Guid id)
        {
            var carrito = await _carritoRepository.GetByIdAsync(id);
            if (carrito == null) { return NotFound("El carrito no existe"); }
            return Ok(MapCarrito(carrito));
        }

        // POST: api/Carrito/{id}/items -> agrega un destino o un hotel
        [HttpPost("{id}/items")]
        public async Task<IActionResult> AgregarItem(Guid id, AgregarItemDto dto)
        {
            if (dto.DestinoId.HasValue == dto.HotelId.HasValue) { return BadRequest("Se debe enviar DestinoId o HotelId (solo uno)."); }

            var carrito = await _carritoRepository.GetByIdAsync(id);
            if (carrito == null) { return NotFound("El carrito no existe"); }

            //Si el producto ya esta en el carrito solo le suma la cantidad
            var existente = carrito.Items.FirstOrDefault(i =>
                (dto.DestinoId.HasValue && i.DestinoId == dto.DestinoId) ||
                (dto.HotelId.HasValue && i.HotelId == dto.HotelId));

            if (existente != null)
            {
                await _carritoRepository.UpdateCantidadAsync(existente.Id, existente.Cantidad + dto.Cantidad);
                return NoContent();
            }

            // El precio lo toma el servidor nunca el cliente
            decimal precio;
            if (dto.DestinoId.HasValue)
            {
                var destino = await _destinoRepository.GetByIdAsync(dto.DestinoId.Value);
                if (destino == null) { return NotFound("El destino no existe."); }
                precio = destino.Price;
            }
            else
            {
                var hotel = await _hotelRepository.GetByIdAsync(dto.HotelId!.Value);
                if (hotel == null) { return NotFound("El hotel no existe."); }
                precio = hotel.Price;
            }

            await _carritoRepository.AddItemAsync(id, new ItemCarrito
            {
                DestinoId = dto.DestinoId,
                HotelId = dto.HotelId,
                Cantidad = dto.Cantidad,
                PrecioUnitario = precio
            });

            return NoContent();
        }

        // PUT: api/Carrito/{id}/items/{itemsId} -> cambia la cantidad (0 = quitar)
        [HttpPut("{id}/items/{itemsId}")]
        public async Task<IActionResult> ActualizarCantidad(Guid id, Guid itemsId, ActualizarCantidadDto dto)
        {
            var carrito = await _carritoRepository.GetByIdAsync(id);
            if (carrito == null || !carrito.Items.Any(i => i.Id == itemsId)) { return NotFound("El ítem no existe en este carrito."); }
            if (dto.Cantidad == 0)
            { 
                await _carritoRepository.RemoveItemAsync(itemsId);
            }
            else 
            { 
                await _carritoRepository.UpdateCantidadAsync(itemsId, dto.Cantidad);
            }

            return NoContent();
        }

        // DELETE: api/Carrito/{id}/items/{itemsId} -> quita un item del carrito
        [HttpDelete("{id}/items/{itemId}")]
        public async Task<IActionResult> QuitarItem(Guid id, Guid itemId)
        {
            var carrito = await _carritoRepository.GetByIdAsync(id);
            if (carrito == null || !carrito.Items.Any(i => i.Id == itemId)) { return NotFound("El ítem no existe en este carrito."); }
            await _carritoRepository.RemoveItemAsync(itemId);
            return NoContent();
        }

        // DELETE: api/Carrito/{id}/items -> vacia el carrito
        [HttpDelete("{id}/items")]
        public async Task<IActionResult> VaciarCarrito(Guid id)
        {
            var carrito = await _carritoRepository.GetByIdAsync(id);
            if (carrito == null) { return NotFound("El carrito no existe."); }
            await _carritoRepository.ClearCarritoAsync(id);
            return NoContent();
        }

        // Entidad -> DTO (Cuando exista la capa BLL, esto se mueve ahi)
        private static CarritoDto MapCarrito(Carrito carrito) => new()
        {
            Id = carrito.Id,
            Items = carrito.Items.Select(i => new ItemCarritoDto
            {
                Id = i.Id,
                DestinoId = i.DestinoId,
                HotelId = i.HotelId,
                // Si el producto se borró, el item queda sin nombre
                Nombre = i.Destino?.Name ?? i.Hotel?.Name ?? "(Producto no disponible)",
                Imagen = i.Destino != null ?$"/{i.Destino.Url}/{i.Destino.ImageId}.jpg"
                       : i.Hotel != null ? $"/{i.Hotel.Url}/{i.Hotel.ImageId}.jpg"
                       : string.Empty,
                Cantidad = i.Cantidad,
                PrecioUnitario = i.PrecioUnitario
            }).ToList()
        };
    }
}
