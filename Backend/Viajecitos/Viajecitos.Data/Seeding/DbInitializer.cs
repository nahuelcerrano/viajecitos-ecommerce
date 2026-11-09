using System.Text.Json;
using Microsoft.EntityFrameworkCore;
using Viajecitos.Core.Entities;

namespace Viajecitos.Data.Seeding
{
    public static class DbInitializer
    {
        private static readonly JsonSerializerOptions JsonOptions = new() { PropertyNameCaseInsensitive = true };

        public static async Task InitializeAsync(ApplicationDbContext context)
        {
            // Aplica las migraciones pendientes (crea la base y las tablas si no existen).
            // Reemplaza a EnsureCreatedAsync(), que ignoraba las migraciones.
            await context.Database.MigrateAsync();

            await SeedFromJsonAsync(context, context.Destino, "destinos.json");
            await SeedFromJsonAsync(context, context.Hotel, "hoteles.json");
        }

        // Carga una tabla desde un JSON solo si la tabla está vacía.
        // Los JSON se copian a bin/ (ver Viajecitos.API.csproj), por eso se buscan en
        // AppContext.BaseDirectory y no en la carpeta desde donde se ejecuta la API.
        private static async Task SeedFromJsonAsync<T>(ApplicationDbContext context, DbSet<T> table, string fileName)
            where T : class
        {
            if (await table.AnyAsync())
            {
                return;
            }

            var path = Path.Combine(AppContext.BaseDirectory, fileName);

            if (!File.Exists(path))
            {
                Console.WriteLine($"No se encontró el archivo de seeding: {path}");
                return;
            }

            try
            {
                var json = await File.ReadAllTextAsync(path);
                var items = JsonSerializer.Deserialize<List<T>>(json, JsonOptions);

                if (items is { Count: > 0 })
                {
                    await table.AddRangeAsync(items);
                    await context.SaveChangesAsync();
                    Console.WriteLine($"Seeding de {fileName} exitoso ({items.Count} registros).");
                }
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine($"Error al sembrar {fileName}: {ex.Message}");
            }
        }
    }
}
