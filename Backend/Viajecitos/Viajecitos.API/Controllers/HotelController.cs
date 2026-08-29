using Microsoft.AspNetCore.Mvc;
using Viajecitos.Core.Entities;
using Viajecitos.Core.Interfaces;

namespace Viajecitos.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HotelController : ControllerBase
    {
        private readonly IHotelRepository _hotelRepository;

        public HotelController(IHotelRepository hotelRepository)
        {
            _hotelRepository = hotelRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Hotel>>> GetHoteles()
        {
            var hoteles = await _hotelRepository.GetAllAsync();
            return Ok(hoteles);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Hotel>> GetHotel(Guid id)
        {
            var hotel = await _hotelRepository.GetByIdAsync(id);
            if (hotel == null)
            {
                return NotFound();
            }
            return Ok(hotel);
        }
    }
}
