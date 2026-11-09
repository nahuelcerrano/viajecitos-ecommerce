using System;
using System.Collections.Generic;
using System.Text;
using Viajecitos.Core.Entities;
using Viajecitos.Core.Interfaces;
using Viajecitos.Services.Exceptions;
using Viajecitos.Services.Interfaces;

namespace Viajecitos.Services
{
    public class DestinoService : IDestinoService
    {
        private readonly IDestinoRepository _destinoRepository;

        public DestinoService(IDestinoRepository destinoRepository)
        {
            _destinoRepository = destinoRepository;
        }

        public Task<IEnumerable<Destino>> ObtenerTodosAsync()
        {
            return _destinoRepository.GetAllAsync();
        }

        public async Task<Destino> ObtenerPorIdAsync(Guid id)
        {
            return await _destinoRepository.GetByIdAsync(id)
                ?? throw new NotFoundException("El destino no existe");
        }
    }
}
