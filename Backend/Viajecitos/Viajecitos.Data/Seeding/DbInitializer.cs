using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json;
using Viajecitos.Core.Entities;

namespace Viajecitos.Data.Seeding
{
    public static class DbInitializer
    {
        public static async Task InitializeAsync(ApplicationDbContext context)
        {
            await context.Database.EnsureCreatedAsync();
            var options = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };

            if (!context.Destino.Any())
            {
                var jsonDestinoPath = Path.Combine(Directory.GetCurrentDirectory(), "destinos.json");
                
                try
                {
                    if (!File.Exists(jsonDestinoPath))
                    {
                        Console.WriteLine("No se encontró el archivo de destinos.");
                    }
                    else
                    {
                        var jsonDestino = await File.ReadAllTextAsync(jsonDestinoPath);
                        var destinos = JsonSerializer.Deserialize<List<Destino>>(jsonDestino, options);
                        
                        if (destinos != null && destinos.Any())
                        {
                            await context.Destino.AddRangeAsync(destinos);
                            await context.SaveChangesAsync();
                            Console.WriteLine("Sembrado de base de datos de destinos exitoso.");
                        }
                    }
                }
                catch (Exception ex)
                {
                    Console.Error.WriteLine($"Error al sembrar la base de datos de destino: {ex.Message}");
                }
            }

            if (!context.Hotel.Any())
            {
                var jsonHotelPath = Path.Combine(Directory.GetCurrentDirectory(), "hoteles.json");

                try
                {
                    if (!File.Exists(jsonHotelPath))
                    {
                        Console.WriteLine("No se encontró el archivo de hoteles.");
                    }
                    else
                    {
                        var jsonHotel = await File.ReadAllTextAsync(jsonHotelPath);
                        var hoteles = JsonSerializer.Deserialize<List<Hotel>>(jsonHotel, options);

                        if (hoteles != null && hoteles.Any())
                        {
                            await context.Hotel.AddRangeAsync(hoteles);
                            await context.SaveChangesAsync();
                            Console.WriteLine("Sembrado de base de datos de hoteles exitoso.");
                        }
                    }
                }
                catch (Exception ex)
                {
                    Console.ForegroundColor = ConsoleColor.Red;
                    Console.Error.WriteLine($"Error al sembrar la base de datos de hoteles: {ex.Message}");
                    Console.ResetColor();
                }
            }

        }
    }
}
