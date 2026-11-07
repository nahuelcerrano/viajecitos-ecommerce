# 04 · Backend: clases, propiedades, métodos y relaciones

Namespaces: `Viajecitos.Core.Entities`, `Viajecitos.Core.Interfaces`, `Viajecitos.Data`, `Viajecitos.Data.Repositories`, `Viajecitos.Data.Seeding`, `Viajecitos.API.Controllers`.

## Diagrama de clases completo

```
═══════════════════════════════ Viajecitos.API ═══════════════════════════════

 ┌───────────────────────────────────┐      ┌───────────────────────────────────┐
 │ DestinoController : ControllerBase│      │ HotelController : ControllerBase  │
 │ [Route("api/[controller]")]       │      │ [Route("api/[controller]")]       │
 ├───────────────────────────────────┤      ├───────────────────────────────────┤
 │ - _destinoRepository              │      │ - _hotelRepository                │
 │     : IDestinoRepository          │      │     : IHotelRepository            │
 ├───────────────────────────────────┤      ├───────────────────────────────────┤
 │ + GetDestinos()                   │      │ + GetHoteles()                    │
 │     : Task<ActionResult<          │      │     : Task<ActionResult<          │
 │         IEnumerable<Destino>>>    │      │         IEnumerable<Hotel>>>      │
 │ + GetDestino(Guid id)             │      │ + GetHotel(Guid id)               │
 │     : Task<ActionResult<Destino>> │      │     : Task<ActionResult<Hotel>>   │
 └─────────────────┬─────────────────┘      └─────────────────┬─────────────────┘
                   │ usa                                      │ usa
═══════════════════╪════════════ Viajecitos.Core ═════════════╪════════════════
                   ▼                                          ▼
 ┌──────────────────────────────────┐   ┌──────────────────────────────────┐
 │ «interface» IDestinoRepository   │   │ «interface» IHotelRepository     │
 ├──────────────────────────────────┤   ├──────────────────────────────────┤
 │ + GetAllAsync()                  │   │ + GetAllAsync()                  │
 │     : Task<IEnumerable<Destino>> │   │     : Task<IEnumerable<Hotel>>   │
 │ + GetByIdAsync(Guid id)          │   │ + GetByIdAsync(Guid id)          │
 │     : Task<Destino?>             │   │     : Task<Hotel?>               │
 └────────────────△─────────────────┘   └────────────────△─────────────────┘
                  ┆ implementa                           ┆ implementa
 ┌──────────────────────────────────────────┐            ┆
 │ «interface» ICarritoRepository           │            ┆
 ├──────────────────────────────────────────┤            ┆
 │ + GetByIdAsync(Guid carritoId)           │            ┆
 │     : Task<Carrito?>                     │            ┆
 │ + CreateAsync() : Task<Carrito>          │            ┆
 │ + AddItemAsync(Guid carritoId,           │            ┆
 │                ItemCarrito item)         │            ┆
 │     : Task<ItemCarrito>                  │            ┆
 │ + RemoveItemAsync(Guid itemId) : Task    │            ┆
 │ + ClearCarritoAsync(Guid carritoId)      │            ┆
 │     : Task                               │            ┆
 └────────────────△─────────────────────────┘            ┆
                  ┆ implementa       (sin controlador)   ┆
══════════════════╪═══════════════ Viajecitos.Data ══════╪═════════════════════
 ┌────────────────┴────────┐ ┌───────────────────────┐ ┌─┴─────────────────────┐
 │ CarritoRepository       │ │ DestinoRepository     │ │ HotelRepository       │
 ├─────────────────────────┤ ├───────────────────────┤ ├───────────────────────┤
 │ - _context              │ │ - _context            │ │ - _context            │
 │   : ApplicationDbContext│ │   : ApplicationDb...  │ │   : ApplicationDb...  │
 └────────────┬────────────┘ └───────────┬───────────┘ └───────────┬───────────┘
              └──────────────────────────┼─────────────────────────┘
                                         ▼ usa
              ┌────────────────────────────────────────────────┐
              │ ApplicationDbContext : DbContext               │
              ├────────────────────────────────────────────────┤
              │ + Destino     : DbSet<Destino>                 │
              │ + Hotel       : DbSet<Hotel>                   │
              │ + Carrito     : DbSet<Carrito>                 │
              │ + ItemCarrito : DbSet<ItemCarrito>             │
              ├────────────────────────────────────────────────┤
              │ # OnModelCreating(ModelBuilder)                │
              └────────────────────────────────────────────────┘
              ┌────────────────────────────────────────────────┐
              │ «static» DbInitializer                         │
              ├────────────────────────────────────────────────┤
              │ + InitializeAsync(ApplicationDbContext) : Task │
              │ - SeedFromJsonAsync<T>(context, DbSet<T>,      │
              │                        string fileName) : Task │
              └────────────────────────────────────────────────┘
```

## Entidades y relaciones

```
 ┌────────────────────────────┐                   ┌────────────────────────────┐
 │ Carrito                    │                   │ ItemCarrito                │
 ├────────────────────────────┤ 1             0..*├────────────────────────────┤
 │ Id            : Guid  (PK) │◆──────────────────│ Id             : Guid (PK) │
 │ UsuarioId     : string?    │    Items          │ CarritoId      : Guid (FK) │
 │ FechaCreacion : DateTime   │  ON DELETE        │ Carrito        : Carrito?  │
 │ Items : ICollection<       │  CASCADE          │ DestinoId      : Guid? (FK)│
 │         ItemCarrito>       │                   │ Destino        : Destino?  │
 └────────────────────────────┘                   │ HotelId        : Guid? (FK)│
                                                  │ Hotel          : Hotel?    │
                                                  │ Cantidad       : int       │
                                                  │ PrecioUnitario : decimal   │
                                                  └──────┬──────────────┬──────┘
                                       0..*  ON DELETE   │              │  0..*  ON DELETE
                                             SET NULL    │              │        SET NULL
                                                         ▼ 0..1    0..1 ▼
 ┌────────────────────────────────────┐   ┌────────────────────────────────────┐
 │ Destino                            │   │ Hotel                              │
 ├────────────────────────────────────┤   ├────────────────────────────────────┤
 │ Id          : Guid  (PK)           │   │ Id          : Guid  (PK)           │
 │ Name        : string  (required)   │   │ Name        : string  (required)   │
 │ Country     : string  (required)   │   │ Country     : string  (required)   │
 │ Continent   : string  (required)   │   │ Continent   : string  (required)   │
 │ Alt         : string  (required)   │   │ Alt         : string  (required)   │
 │ Description : string  (required)   │   │ Description : string  (required)   │
 │ Price       : decimal              │   │ Price       : decimal              │
 │ Discount    : int                  │   │ Url         : string = "hoteles"   │
 │ Bank        : string  (required)   │   │ ImageId     : string  (required)   │
 │ Rating      : double?              │   └────────────────────────────────────┘
 │ Guide       : string?              │
 │ Url         : string = "countries" │
 │ ImageId     : string  (required)   │
 └────────────────────────────────────┘
```

Lectura de las relaciones:

| Relación | Cardinalidad | FK | Al borrar el padre | Configurada en |
|---|---|---|---|---|
| Carrito → ItemCarrito | 1 a muchos (composición: el ítem no existe sin carrito) | `ItemCarrito.CarritoId` (obligatoria) | **Cascade**: se borran sus ítems | `OnModelCreating` |
| ItemCarrito → Destino | muchos a 0..1 (sin colección inversa en Destino) | `ItemCarrito.DestinoId` (nullable) | **SetNull**: el ítem queda con `DestinoId = null` | `OnModelCreating` |
| ItemCarrito → Hotel | muchos a 0..1 (sin colección inversa en Hotel) | `ItemCarrito.HotelId` (nullable) | **SetNull** | `OnModelCreating` |

Reglas de diseño que hoy dependen de la lógica (no de la base):

- Un `ItemCarrito` debería tener **exactamente uno** de `DestinoId` / `HotelId`. No hay restricción en la base ni validación en código que lo garantice → corresponde a la futura BLL.
- `PrecioUnitario` guarda el precio **al momento de agregar** el ítem (así el carrito no cambia si después cambia `Destino.Price`).
- `Destino.Discount` + `Destino.Bank` modelan el descuento por banco (ej. 10 % con Visa). Hoy solo se muestran; no se aplican en ningún cálculo.
- `Url` + `ImageId` arman la ruta de la imagen en el front: `/{Url}/{ImageId}.jpg` (ej. `/countries/country1.jpg`).
- Todos los `Id` se generan en C# con `Guid.NewGuid()` (no en la base).

## Detalle de cada clase

### Controladores (`Viajecitos.API/Controllers`)

| Clase | Dependencia inyectada | Método | Verbo y ruta | Respuestas |
|---|---|---|---|---|
| `DestinoController` | `IDestinoRepository` | `GetDestinos()` | `GET /api/Destino` | 200 + lista |
| | | `GetDestino(Guid id)` | `GET /api/Destino/{id}` | 200 / 404 |
| `HotelController` | `IHotelRepository` | `GetHoteles()` | `GET /api/Hotel` | 200 + lista |
| | | `GetHotel(Guid id)` | `GET /api/Hotel/{id}` | 200 / 404 |

Las rutas no distinguen mayúsculas: el front llama a `/api/destino` y `/api/hotel`.
Los controladores devuelven **las entidades directamente** (no hay DTOs todavía). ASP.NET serializa en camelCase (`Name` → `name`).

### Repositorios (`Viajecitos.Data/Repositories`)

| Clase | Método | Qué hace en EF Core |
|---|---|---|
| `DestinoRepository` | `GetAllAsync()` | `_context.Destino.ToListAsync()` |
| | `GetByIdAsync(id)` | `_context.Destino.FindAsync(id)` |
| `HotelRepository` | `GetAllAsync()` | `_context.Hotel.ToListAsync()` |
| | `GetByIdAsync(id)` | `_context.Hotel.FindAsync(id)` |
| `CarritoRepository` | `GetByIdAsync(carritoId)` | Trae el carrito con `Include(Items).ThenInclude(Destino)` y `ThenInclude(Hotel)` |
| | `CreateAsync()` | Crea un `Carrito` vacío y hace `SaveChangesAsync` |
| | `AddItemAsync(carritoId, item)` | Asigna `item.CarritoId`, lo agrega y guarda |
| | `RemoveItemAsync(itemId)` | Busca el ítem con `FindAsync`; si existe lo borra y guarda |
| | `ClearCarritoAsync(carritoId)` | Borra todos los ítems del carrito (`RemoveRange`) y guarda |

Los tres repositorios se registran como **Scoped** (una instancia por request, igual que el `DbContext`).

### `ApplicationDbContext` (`Viajecitos.Data`)

- Constructor: recibe `DbContextOptions<ApplicationDbContext>` (la cadena de conexión llega desde `Program.cs`).
- `DbSet` con nombre en singular → las tablas se llaman `"Destino"`, `"Hotel"`, `"Carrito"`, `"ItemCarrito"` (en Postgres hay que usar comillas por las mayúsculas).
- `OnModelCreating`: configura las 3 relaciones de `ItemCarrito` descritas arriba.

### `DbInitializer` (`Viajecitos.Data/Seeding`)

- Método estático `InitializeAsync(context)`, llamado una vez al arrancar la API.
- Ejecuta `Database.MigrateAsync()` (aplica las migraciones pendientes) y después llama a `SeedFromJsonAsync<T>` para `Destino` y `Hotel`.
- `SeedFromJsonAsync<T>` (privado, genérico): si la tabla está vacía, lee el JSON desde `AppContext.BaseDirectory` (carpeta `bin/`) y lo deserializa con `PropertyNameCaseInsensitive = true`. `destinos.json` tiene 32 registros y `hoteles.json` 28.
- Los JSON viven en `Viajecitos.API/` y se copian a `bin/` al compilar (`CopyToOutputDirectory` en `Viajecitos.API.csproj`).
- Los JSON no traen `Id`: se generan con `Guid.NewGuid()` al deserializar.

## Endpoints disponibles

| Método | Ruta | Descripción | Estado |
|---|---|---|---|
| GET | `/api/Destino` | Lista todos los destinos | ✅ |
| GET | `/api/Destino/{id}` | Un destino por Guid | ✅ |
| GET | `/api/Hotel` | Lista todos los hoteles | ✅ |
| GET | `/api/Hotel/{id}` | Un hotel por Guid | ✅ |
| — | `/api/Carrito/...` | Crear carrito, agregar/quitar ítems, vaciar | ❌ Repositorio listo, falta controlador |
