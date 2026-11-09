using Microsoft.EntityFrameworkCore;
using Viajecitos.Data;
using Viajecitos.Core.Interfaces;
using Viajecitos.Data.Repositories;
using Viajecitos.Data.Seeding;
using Viajecitos.API.Handlers;
using Viajecitos.Services;
using Viajecitos.Services.Interfaces;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// La connection string NO está en appsettings.json: se carga desde User Secrets
// (ver docs/02-como-ejecutar.md). Si falta, cortamos con un mensaje claro.
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection")
    ?? throw new InvalidOperationException(
        "Falta la connection string 'DefaultConnection'. Configurala con: " +
        "dotnet user-secrets set \"ConnectionStrings:DefaultConnection\" \"Host=localhost;Port=5432;Database=viajecitos;Username=postgres;Password=<tu_password>\"");

builder.Services.AddDbContext<ApplicationDbContext>(options =>
   options.UseNpgsql(connectionString));
builder.Services.AddScoped<IDestinoRepository, DestinoRepository>();
builder.Services.AddScoped<IHotelRepository, HotelRepository>();
builder.Services.AddScoped<ICarritoRepository, CarritoRepository>();

// BLL
builder.Services.AddScoped<IDestinoService, DestinoService>();
builder.Services.AddScoped<IHotelService, HotelService>();
builder.Services.AddScoped<ICarritoService, CarritoService>();

// Excepciones de la BLL -> respuestas HTTP
builder.Services.AddExceptionHandler<ApiExceptionHandler>();
builder.Services.AddProblemDetails();

var app = builder.Build();

app.UseExceptionHandler();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    try
    {
        var context = services.GetRequiredService<ApplicationDbContext>();
        await DbInitializer.InitializeAsync(context);
    }
    catch(Exception ex)
    {
        Console.WriteLine($"Ocurrió un error al migrar o sembrar la base de datos: {ex.Message}");
    }
}

app.Run();
