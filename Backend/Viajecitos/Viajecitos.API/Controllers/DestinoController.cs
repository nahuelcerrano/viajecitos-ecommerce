using Microsoft.AspNetCore.Mvc;
using Viajecitos.Core.Entities;
using Viajecitos.Services.Interfaces;

namespace Viajecitos.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DestinoController : ControllerBase
    {
        private readonly IDestinoService _destinoService;

        public DestinoController(IDestinoService destinoService)
        {
            _destinoService = destinoService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Destino>>> GetDestinos()
        {
            return Ok(await _destinoService.ObtenerTodosAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Destino>> GetDestino(Guid id)
        {
            return Ok(await _destinoService.ObtenerPorIdAsync(id));
        }
    }
}
