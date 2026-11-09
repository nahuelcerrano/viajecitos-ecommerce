using System.ComponentModel.DataAnnotations;

namespace Viajecitos.API.Dtos
{
 
    public class AgregarItemDto
    {
        public Guid? DestinoId { get; set; }
        public Guid? HotelId { get; set; }

        [Range(1, 99, ErrorMessage = "La cantidad debe estar entre 1 y 99.")]
        public int Cantidad { get; set; } = 1;
    }

    public class ActualizarCantidadDto
    {
        [Range (0, 99, ErrorMessage = "La cantidad debe estar entre 0 y 99.")]
        public int Cantidad { get; set; } // 0 = quitar item del carrito
    }

    // --- Lo que devuelve la API ---

    public class ItemCarritoDto
    {
        public Guid Id { get; set; }
        public Guid? DestinoId { get; set; }
        public Guid? HotelId { get; set; }
        public string Nombre { get; set; } = string.Empty;
        public string Imagen { get; set; } = string.Empty;
        public int Cantidad { get; set; }
        public decimal PrecioUnitario { get; set; }
        public decimal Subtotal => Cantidad * PrecioUnitario;
    }

    public class CarritoDto
    {
        public Guid Id { get; set; }
        public List<ItemCarritoDto> Items { get; set; } = new();
        public decimal Total => Items.Sum(i => i.Subtotal);
    }
}
