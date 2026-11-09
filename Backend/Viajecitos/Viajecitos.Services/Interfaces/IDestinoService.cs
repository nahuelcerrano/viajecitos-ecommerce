using System;
using System.Collections.Generic;
using System.Text;
using Viajecitos.Core.Entities;

namespace Viajecitos.Services.Interfaces
{
    public interface IDestinoService
    {
        Task<IEnumerable<Destino>> ObtenerTodosAsync();
        Task<Destino> ObtenerPorIdAsync(Guid id);
    }
}
