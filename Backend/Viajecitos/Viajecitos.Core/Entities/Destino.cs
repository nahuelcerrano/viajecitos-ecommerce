using System;
using System.Collections.Generic;
using System.Text;

namespace Viajecitos.Core.Entities
{
    public class Destino
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public required string Name { get; set; }
        public required string Country { get; set; }
        public required string Continent { get; set; }
        public required string Alt {  get; set; }
        public required string Description { get; set; }
        public decimal Price { get; set; }
        public int Discount { get; set; }
        public required string Bank { get; set; }
        public double? Rating { get; set; }
        public string? Guide { get; set; }

        public string Url { get; set; } = "countries";
        public required string ImageId { get; set; }
    }
}