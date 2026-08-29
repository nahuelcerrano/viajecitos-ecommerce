using Microsoft.EntityFrameworkCore;
using Viajecitos.Data;
using Viajecitos.Core.Entities;
using Viajecitos.Core.Interfaces;
using Viajecitos.Data.Repositories;
using Viajecitos.Data.Seeding;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<ApplicationDbContext>(options =>
   options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddScoped<IDestinoRepository, DestinoRepository>();
builder.Services.AddScoped<IHotelRepository, HotelRepository>();
builder.Services.AddScoped<ICarritoRepository, CarritoRepository>();

var app = builder.Build();

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
        Console.WriteLine($"Ocurrió un eror en el sembado de datos: {ex.Message}");
    }
}

app.Run();
