using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using Viajecitos.Core.Entities;
using Viajecitos.Core.Interfaces;

namespace Viajecitos.Data.Repositories
{
    public class HotelRepository : IHotelRepository
    {
        private readonly ApplicationDbContext _context;

        public HotelRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Hotel>> GetAllAsync()
        {
            return await _context.Hotel.ToListAsync();
        }

        public async Task<Hotel?> GetByIdAsync(Guid id)
        {
            return await _context.Hotel.FindAsync(id);
        }
    }
}
