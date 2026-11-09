using System;
using System.Collections.Generic;
using System.Text;
using Viajecitos.Core.Entities;

namespace Viajecitos.Services.Interfaces
{
    public interface IHotelService
    {
        Task<IEnumerable<Hotel>> ObtenerTodosAsync();
        Task<Hotel> ObtenerPorIdAsync(Guid id);
    }
}
