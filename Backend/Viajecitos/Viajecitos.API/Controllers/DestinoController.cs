using Microsoft.AspNetCore.Mvc;
using Viajecitos.Core.Entities;
using Viajecitos.Core.Interfaces;

namespace Viajecitos.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DestinoController : ControllerBase
    {
        private readonly IDestinoRepository _destinoRepository;

        public DestinoController(IDestinoRepository destinoRepository)
        {
            _destinoRepository = destinoRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Destino>>> GetDestinos()
        {
            var destinos = await _destinoRepository.GetAllAsync();
            return Ok(destinos);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Destino>> GetDestino(Guid id)
        {
            var destino = await _destinoRepository.GetByIdAsync(id);
            if (destino == null)
            {
                return NotFound();
            }
            return Ok(destino);
        }
    }
}
