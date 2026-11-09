using System;
using System.Collections.Generic;
using System.Text;
using Viajecitos.Core.Entities;
using Viajecitos.Core.Interfaces;
using Viajecitos.Services.Exceptions;
using Viajecitos.Services.Interfaces;

namespace Viajecitos.Services
{
    public class HotelService : IHotelService
    {
        private readonly IHotelRepository _hotelRepository;

        public HotelService (IHotelRepository hotelRepository)
        {
            _hotelRepository = hotelRepository;
        }

        public Task<IEnumerable<Hotel>> ObtenerTodosAsync()
        {
            return _hotelRepository.GetAllAsync();
        }

        public async Task<Hotel> ObtenerPorIdAsync(Guid id)
        {
            return await _hotelRepository.GetByIdAsync(id)
                ?? throw new NotFoundException("El hotel no existe.");
        }
    }
}
