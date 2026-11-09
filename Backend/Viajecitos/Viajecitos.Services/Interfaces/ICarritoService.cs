using System;
using System.Collections.Generic;
using System.Text;
using Viajecitos.Services.Dtos;

namespace Viajecitos.Services.Interfaces
{
    public interface ICarritoService
    {
        Task<CarritoDto> CrearAsync();
        Task<CarritoDto> ObtenerAsync(Guid carritoId);
        Task AgregarItemAsync(Guid carritoId, AgregarItemDto dto);
        Task ActualizarCantidadAsync(Guid carritoId, Guid itemId, int cantidad);
        Task QuitarItemAsync(Guid carritoId, Guid itemId);
        Task VaciarAsync(Guid carritoId);
    }
}
