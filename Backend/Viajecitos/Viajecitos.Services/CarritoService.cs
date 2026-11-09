using System;
using System.Collections.Generic;
using System.Text;
using Viajecitos.Core.Entities;
using Viajecitos.Core.Interfaces;
using Viajecitos.Services.Dtos;
using Viajecitos.Services.Exceptions;
using Viajecitos.Services.Interfaces;

namespace Viajecitos.Services
{
    public class CarritoService : ICarritoService
    {
        private const int CantidadMaxima = 99;

        private readonly ICarritoRepository _carritoRepository;
        private readonly IDestinoRepository _destinoRepository;
        private readonly IHotelRepository _hotelRepository;

        public CarritoService (
            ICarritoRepository carritoRepository,
            IDestinoRepository destinoRepository,
            IHotelRepository hotelRepository)
        {
            _carritoRepository = carritoRepository;
            _destinoRepository = destinoRepository;
            _hotelRepository = hotelRepository;
        }

        public async Task<CarritoDto> CrearAsync()
        {
            var carrito = await _carritoRepository.CreateAsync();
            return MapCarrito(carrito);
        }

        public async Task<CarritoDto> ObtenerAsync(Guid carritoId)
        {
            var carrito = await ObtenerCarritoAsync(carritoId);
            return MapCarrito(carrito);
        }

        public async Task AgregarItemAsync(Guid carritoId, AgregarItemDto dto)
        {
            if (dto.DestinoId.HasValue == dto.HotelId.HasValue) { throw new BusinessRuleException("Se debe enviar DestinoId o HotelId (solo uno)."); }

            var carrito = await ObtenerCarritoAsync(carritoId);

            var existente = carrito.Items.FirstOrDefault(i =>
                (dto.DestinoId.HasValue && i.DestinoId == dto.DestinoId) ||
                (dto.HotelId.HasValue && i.HotelId == dto.HotelId));

            if (existente != null)
            {
                var nuevaCantidad = existente.Cantidad + dto.Cantidad;
                ValidarCantidad(nuevaCantidad);
                await _carritoRepository.UpdateCantidadAsync(existente.Id, nuevaCantidad);
                return;
            }

            var precio = await ObtenerPrecioAsync(dto);

            await _carritoRepository.AddItemAsync(carritoId, new ItemCarrito
            {
                DestinoId = dto.DestinoId,
                HotelId = dto.HotelId,
                Cantidad = dto.Cantidad,
                PrecioUnitario = precio
            });
        }

        public async Task ActualizarCantidadAsync(Guid carritoId, Guid itemId, int cantidad)
        {
            if (cantidad < 0) { throw new BusinessRuleException("La cantidad no puede ser negativa."); }

            await ValidarItemDelCarritoAsync(carritoId, itemId);
            
            if (cantidad == 0)
            {
                await _carritoRepository.RemoveItemAsync(itemId);
            }
            else
            {
                ValidarCantidad(cantidad);
                await _carritoRepository.UpdateCantidadAsync(itemId, cantidad);
            }
        }

        public async Task QuitarItemAsync(Guid carritoId, Guid itemId)
        {
            await ValidarItemDelCarritoAsync(carritoId, itemId);
            await _carritoRepository.RemoveItemAsync(itemId);
        }

        public async Task VaciarAsync(Guid carritoId)
        {
            await ObtenerCarritoAsync(carritoId); // Valida que el carrito exista
            await _carritoRepository.ClearCarritoAsync(carritoId);
        }

        // -------- Metodos privados --------
        private async Task<Carrito> ObtenerCarritoAsync(Guid carritoId)
        {
            return await _carritoRepository.GetByIdAsync(carritoId)
                ?? throw new NotFoundException("El carrito no existe");
        }

        private async Task ValidarItemDelCarritoAsync(Guid carritoId, Guid itemId)
        {
            var carrito = await ObtenerCarritoAsync(carritoId);
            if (!carrito.Items.Any(i => i.Id == itemId)) { throw new NotFoundException("El item no existe en este carrito."); }
        }

        private async Task<decimal> ObtenerPrecioAsync(AgregarItemDto dto)
        {
            if (dto.DestinoId.HasValue)
            {
                var destino = await _destinoRepository.GetByIdAsync(dto.DestinoId.Value)
                    ?? throw new NotFoundException("El destino no existe");
                return destino.Price;
            }

            var hotel = await _hotelRepository.GetByIdAsync(dto.HotelId!.Value)
                ?? throw new NotFoundException("El hotel no existe");
            return hotel.Price;
        }

        private static void ValidarCantidad(int cantidad)
        {
            if (cantidad > CantidadMaxima) { throw new BusinessRuleException($"La cantidad máximo por producto es: {CantidadMaxima}."); }
        }

        private static CarritoDto MapCarrito(Carrito carrito) => new()
        {
            Id = carrito.Id,
            Items = carrito.Items.Select(i => new ItemCarritoDto
            {
                Id = i.Id,
                DestinoId = i.DestinoId,
                HotelId = i.HotelId,
                Nombre = i.Destino?.Name ?? i.Hotel?.Name ?? "(Producto no disponible)",
                Imagen = i.Destino != null ? $"/{i.Destino.Url}/{i.Destino.ImageId}.jpg"
                       : i.Hotel != null ? $"/{i.Hotel.Url}/{i.Hotel.ImageId}.jpg"
                       : string.Empty,
                Cantidad = i.Cantidad,
                PrecioUnitario = i.PrecioUnitario
            }).ToList()
        };
    }
}
