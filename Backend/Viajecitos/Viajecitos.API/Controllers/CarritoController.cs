using Microsoft.AspNetCore.Mvc;
using Viajecitos.Services.Interfaces;
using Viajecitos.Services.Dtos;

namespace Viajecitos.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CarritoController : ControllerBase
    {
        private readonly ICarritoService _carritoService;

        public CarritoController (ICarritoService carritoService)
        {
            _carritoService = carritoService;
        }

        // POST: api/Carrito -> crea un carrito vacio
        [HttpPost]
        public async Task<ActionResult<CarritoDto>> CrearCarrito()
        {
            var carrito = await _carritoService.CrearAsync();
            return CreatedAtAction(nameof(GetCarrito), new { id = carrito.Id}, carrito);
        }

        // GET: api/Carrito/{id} -> obtiene el carrito con sus items
        [HttpGet("{id}")]
        public async Task<ActionResult<CarritoDto>> GetCarrito(Guid id)
        {
            return Ok(await _carritoService.ObtenerAsync(id));
        }

        // POST: api/Carrito/{id}/items -> agrega un destino o un hotel
        [HttpPost("{id}/items")]
        public async Task<IActionResult> AgregarItem(Guid id, AgregarItemDto dto)
        {
            await _carritoService.AgregarItemAsync(id, dto);
            return NoContent();
        }

        // PUT: api/Carrito/{id}/items/{itemsId} -> cambia la cantidad (0 = quitar)
        [HttpPut("{id}/items/{itemsId}")]
        public async Task<IActionResult> ActualizarCantidad(Guid id, Guid itemsId, ActualizarCantidadDto dto)
        {
            await _carritoService.ActualizarCantidadAsync(id, itemsId, dto.Cantidad);
            return NoContent();
        }

        // DELETE: api/Carrito/{id}/items/{itemsId} -> quita un item del carrito
        [HttpDelete("{id}/items/{itemId}")]
        public async Task<IActionResult> QuitarItem(Guid id, Guid itemId)
        {
            await _carritoService.QuitarItemAsync(id, itemId);
            return NoContent();
        }

        // DELETE: api/Carrito/{id}/items -> vacia el carrito
        [HttpDelete("{id}/items")]
        public async Task<IActionResult> VaciarCarrito(Guid id)
        {
            await _carritoService.VaciarAsync(id);
            return NoContent();
        }
    }
}
