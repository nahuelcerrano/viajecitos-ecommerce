using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using Viajecitos.Core.Entities;
using Viajecitos.Core.Interfaces;

namespace Viajecitos.Data.Repositories
{
    public class DestinoRepository : IDestinoRepository
    {
        private readonly ApplicationDbContext _context;

        public DestinoRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Destino>> GetAllAsync()
        {
            return await _context.Destino.ToListAsync();
        }

        public async Task<Destino?> GetByIdAsync(Guid id)
        {
            return await _context.Destino.FindAsync(id);
        }
    }
}
