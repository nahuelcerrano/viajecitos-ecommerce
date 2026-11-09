using System;
using System.Collections.Generic;
using System.Text;

namespace Viajecitos.Core.Entities
{
    public class Hotel
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public required string Name { get; set; }
        public required string Country { get; set; }
        public required string Continent { get; set; }
        public required string Alt { get; set; }
        public required string Description { get; set; }
        public decimal Price { get; set; }

        public string Url { get; set; } = "hoteles";
        public required string ImageId { get; set; }
    }
}
