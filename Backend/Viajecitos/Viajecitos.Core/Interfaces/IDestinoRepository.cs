using System;
using System.Collections.Generic;
using System.Text;
using Viajecitos.Core.Entities;

namespace Viajecitos.Core.Interfaces
{
    public interface IDestinoRepository
    {
        Task<IEnumerable<Destino>> GetAllAsync();
        Task<Destino?> GetByIdAsync(Guid id);
    }
}
