using System;
using System.Collections.Generic;
using System.Text;

namespace Viajecitos.Core.Entities
{
    public class ItemCarrito
    {
        public Guid Id { get; set; } = Guid.NewGuid();

        public Guid CarritoId { get; set; }
        public Carrito? Carrito { get; set; }

        public Guid? DestinoId { get; set; }
        public Destino? Destino { get; set; }
        public Guid? HotelId { get; set; }
        public Hotel? Hotel { get; set; }

        public int Cantidad { get; set; }
        public decimal PrecioUnitario { get; set; }
    }
}
