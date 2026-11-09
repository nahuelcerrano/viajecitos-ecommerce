using Microsoft.AspNetCore.Mvc;
using Viajecitos.Core.Entities;
using Viajecitos.Services.Interfaces;

namespace Viajecitos.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HotelController : ControllerBase
    {
        private readonly IHotelService _hotelService;

        public HotelController(IHotelService hotelService)
        {
            _hotelService = hotelService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Hotel>>> GetHoteles()
        {
            return Ok(await _hotelService.ObtenerTodosAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Hotel>> GetHotel(Guid id)
        {
            return Ok(await _hotelService.ObtenerPorIdAsync(id));
        }
    }
}
