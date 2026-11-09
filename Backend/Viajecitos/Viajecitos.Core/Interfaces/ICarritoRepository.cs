using System;
using System.Collections.Generic;
using System.Text;
using Viajecitos.Core.Entities;

namespace Viajecitos.Core.Interfaces
{
    public interface ICarritoRepository
    {
        Task<Carrito?> GetByIdAsync(Guid carritoId);
        Task<Carrito> CreateAsync();
        Task<ItemCarrito> AddItemAsync(Guid carritoId, ItemCarrito item);
        Task RemoveItemAsync(Guid itemId);
        Task ClearCarritoAsync(Guid carritoId);
        Task UpdateCantidadAsync(Guid itemId, int cantidad);
    }
}
