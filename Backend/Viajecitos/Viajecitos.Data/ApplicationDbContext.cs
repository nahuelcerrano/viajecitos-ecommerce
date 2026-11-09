using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore;
using Viajecitos.Core.Entities;

namespace Viajecitos.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public DbSet<Destino> Destino { get; set; }
        public DbSet<Hotel> Hotel { get; set; }
        public DbSet<Carrito> Carrito { get; set; }
        public DbSet<ItemCarrito> ItemCarrito { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<ItemCarrito>()
                .HasOne(i => i.Carrito)
                .WithMany(c => c.Items)
                .HasForeignKey(i => i.CarritoId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<ItemCarrito>()
                .HasOne(i => i.Destino)
                .WithMany()
                .HasForeignKey(i => i.DestinoId)
                .OnDelete(DeleteBehavior.SetNull);

            modelBuilder.Entity<ItemCarrito>()
                .HasOne(i => i.Hotel)
                .WithMany()
                .HasForeignKey(i => i.HotelId)
                .OnDelete(DeleteBehavior.SetNull);
        }
    }
}
