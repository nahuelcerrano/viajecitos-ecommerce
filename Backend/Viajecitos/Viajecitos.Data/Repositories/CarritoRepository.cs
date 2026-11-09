using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using Viajecitos.Core.Entities;
using Viajecitos.Core.Interfaces;

namespace Viajecitos.Data.Repositories
{
    public class CarritoRepository : ICarritoRepository
    {
        private readonly ApplicationDbContext _context;

        public CarritoRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Carrito?> GetByIdAsync(Guid carritoId)
        {
            return await _context.Carrito
                .Include(c => c.Items)
                  .ThenInclude(i => i.Destino)
                .Include(c => c.Items)
                 .ThenInclude(i => i.Hotel)
                .FirstOrDefaultAsync(c => c.Id == carritoId);
        }

        public async Task<Carrito> CreateAsync()
        {
            var carrito = new Carrito();
            await _context.Carrito.AddAsync(carrito);
            await _context.SaveChangesAsync();
            return carrito;
        }

        public async Task<ItemCarrito> AddItemAsync(Guid carritoId, ItemCarrito item)
        {
            item.CarritoId = carritoId;
            await _context.ItemCarrito.AddAsync(item);
            await _context.SaveChangesAsync();
            return item;
        }

        public async Task RemoveItemAsync(Guid itemId)
        {
            var item = await _context.ItemCarrito.FindAsync(itemId);
            if (item != null)
            {
                _context.ItemCarrito.Remove(item);
                await _context.SaveChangesAsync();
            }
        }

        public async Task ClearCarritoAsync(Guid carritoId)
        {
            var items = await _context.ItemCarrito.Where(i => i.CarritoId == carritoId).ToListAsync();
            _context.ItemCarrito.RemoveRange(items);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateCantidadAsync(Guid itemId, int cantidad)
        {
            var item = await _context.ItemCarrito.FindAsync(itemId);
            if (item != null)
            {
                item.Cantidad = cantidad;
                await _context.SaveChangesAsync();
            }
        }
    }
}
