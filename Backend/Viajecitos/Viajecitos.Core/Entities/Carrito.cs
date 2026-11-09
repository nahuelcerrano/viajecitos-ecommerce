using System;
using System.Collections.Generic;
using System.Text;

namespace Viajecitos.Core.Entities
{
    public class Carrito
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string? UsuarioId { get; set; }
        public DateTime FechaCreacion { get; set; } = DateTime.UtcNow;

        public ICollection<ItemCarrito> Items { get; set; } = new List<ItemCarrito>();
    }
}
