using System;
using System.Collections.Generic;
using System.Text;
using Viajecitos.Core.Entities;

namespace Viajecitos.Core.Interfaces
{
    public interface IHotelRepository
    {
        Task<IEnumerable<Hotel>> GetAllAsync();
        Task<Hotel?> GetByIdAsync(Guid id);
    }
}
