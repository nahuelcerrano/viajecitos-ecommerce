# 04 · Backend: clases, propiedades, métodos y relaciones

Namespaces: `Viajecitos.API.Controllers`, `Viajecitos.API.Handlers`, `Viajecitos.Services`, `Viajecitos.Services.Interfaces`, `Viajecitos.Services.Dtos`, `Viajecitos.Services.Exceptions`, `Viajecitos.Core.Entities`, `Viajecitos.Core.Interfaces`, `Viajecitos.Data`, `Viajecitos.Data.Repositories`, `Viajecitos.Data.Seeding`.

## Diagrama de clases por capa

```
═══════════════════════════════════ Viajecitos.API (UI) ═══════════════════════════════════

 ┌─────────────────────────────┐ ┌─────────────────────────────┐ ┌──────────────────────────────────┐
 │ DestinoController           │ │ HotelController             │ │ CarritoController                │
 │   : ControllerBase          │ │   : ControllerBase          │ │   : ControllerBase               │
 ├─────────────────────────────┤ ├─────────────────────────────┤ ├──────────────────────────────────┤
 │ - _destinoService           │ │ - _hotelService             │ │ - _carritoService                │
 │     : IDestinoService       │ │     : IHotelService         │ │     : ICarritoService            │
 ├─────────────────────────────┤ ├─────────────────────────────┤ ├──────────────────────────────────┤
 │ + GetDestinos()             │ │ + GetHoteles()              │ │ + CrearCarrito()                 │
 │ + GetDestino(Guid id)       │ │ + GetHotel(Guid id)         │ │ + GetCarrito(Guid id)            │
 └──────────────┬──────────────┘ └──────────────┬──────────────┘ │ + AgregarItem(id, AgregarItemDto)│
                │                               │                │ + ActualizarCantidad(id, itemsId,│
                │                               │                │       ActualizarCantidadDto)     │
                │                               │                │ + QuitarItem(id, itemId)         │
                │                               │                │ + VaciarCarrito(id)              │
                │                               │                └────────────────┬─────────────────┘
                │                               │                                 │
 ┌──────────────────────────────────────────────────────┐                         │
 │ ApiExceptionHandler : IExceptionHandler              │                         │
 ├──────────────────────────────────────────────────────┤                         │
 │ + TryHandleAsync(HttpContext, Exception, ct)         │                         │
 │     NotFoundException     → 404 ProblemDetails       │                         │
 │     BusinessRuleException → 400 ProblemDetails       │                         │
 │     otra                  → false (500 por defecto)  │                         │
 └──────────────────────────────────────────────────────┘                         │
                │ usa                           │ usa                             │ usa
════════════════╪════════════════ Viajecitos.Services (BLL) ══════════════════════╪═══════════════
                ▼                               ▼                                 ▼
 ┌─────────────────────────────┐ ┌─────────────────────────────┐ ┌──────────────────────────────────┐
 │ «interface» IDestinoService │ │ «interface» IHotelService   │ │ «interface» ICarritoService      │
 ├─────────────────────────────┤ ├─────────────────────────────┤ ├──────────────────────────────────┤
 │ + ObtenerTodosAsync()       │ │ + ObtenerTodosAsync()       │ │ + CrearAsync() : Task<CarritoDto>│
 │   : Task<IEnumerable<       │ │   : Task<IEnumerable<       │ │ + ObtenerAsync(Guid carritoId)   │
 │       Destino>>             │ │       Hotel>>               │ │   : Task<CarritoDto>             │
 │ + ObtenerPorIdAsync(Guid)   │ │ + ObtenerPorIdAsync(Guid)   │ │ + AgregarItemAsync(Guid,         │
 │   : Task<Destino>           │ │   : Task<Hotel>             │ │       AgregarItemDto) : Task     │
 └──────────────△──────────────┘ └──────────────△──────────────┘ │ + ActualizarCantidadAsync(Guid,  │
                ┆ implementa                    ┆ implementa     │       Guid itemId, int) : Task   │
 ┌──────────────┴──────────────┐ ┌──────────────┴──────────────┐ │ + QuitarItemAsync(Guid, Guid)    │
 │ DestinoService              │ │ HotelService                │ │ + VaciarAsync(Guid) : Task       │
 ├─────────────────────────────┤ ├─────────────────────────────┤ └────────────────△─────────────────┘
 │ - _destinoRepository        │ │ - _hotelRepository          │                  ┆ implementa
 │     : IDestinoRepository    │ │     : IHotelRepository      │ ┌────────────────┴─────────────────┐
 └──────────────┬──────────────┘ └──────────────┬──────────────┘ │ CarritoService                   │
                │                               │                ├──────────────────────────────────┤
                │                               │                │ - CantidadMaxima = 99  «const»   │
                │                               │                │ - _carritoRepository             │
                │                               │                │ - _destinoRepository  (precio)   │
                │                               │                │ - _hotelRepository    (precio)   │
                │                               │                ├──────────────────────────────────┤
                │                               │                │ (los 6 de ICarritoService)       │
                │                               │                │ - ObtenerCarritosAsync(Guid)     │
                │                               │                │ - ValidarItemDelCarritoAsync(…)  │
                │                               │                │ - ObtenerPrecioAsync(dto)        │
                │                               │                │ - ValidarCantidad(int) «static»  │
                │                               │                │ - MapCarrito(Carrito) «static»   │
                │                               │                └────────────────┬─────────────────┘
                │ usa                           │ usa                             │ usa
════════════════╪════════════════ Viajecitos.Core (BE) ═══════════════════════════╪═══════════════
                ▼                               ▼                                 ▼
 ┌─────────────────────────────┐ ┌─────────────────────────────┐ ┌──────────────────────────────────┐
 │ «interface»                 │ │ «interface»                 │ │ «interface» ICarritoRepository   │
 │ IDestinoRepository          │ │ IHotelRepository            │ ├──────────────────────────────────┤
 ├─────────────────────────────┤ ├─────────────────────────────┤ │ + GetByIdAsync(Guid)             │
 │ + GetAllAsync()             │ │ + GetAllAsync()             │ │     : Task<Carrito?>             │
 │   : Task<IEnumerable<       │ │   : Task<IEnumerable<       │ │ + CreateAsync() : Task<Carrito>  │
 │       Destino>>             │ │       Hotel>>               │ │ + AddItemAsync(Guid, ItemCarrito)│
 │ + GetByIdAsync(Guid)        │ │ + GetByIdAsync(Guid)        │ │     : Task<ItemCarrito>          │
 │   : Task<Destino?>          │ │   : Task<Hotel?>            │ │ + RemoveItemAsync(Guid itemId)   │
 └──────────────△──────────────┘ └──────────────△──────────────┘ │ + ClearCarritoAsync(Guid)        │
                ┆                               ┆                │ + UpdateCantidadAsync(           │
                ┆                               ┆                │       Guid itemId, int cantidad) │
                ┆                               ┆                └────────────────△─────────────────┘
                ┆ implementa                    ┆ implementa                      ┆ implementa
════════════════╪════════════════ Viajecitos.Data (DAL) ══════════════════════════╪═══════════════
 ┌──────────────┴──────────────┐ ┌──────────────┴──────────────┐ ┌────────────────┴─────────────────┐
 │ DestinoRepository           │ │ HotelRepository             │ │ CarritoRepository                │
 │ - _context                  │ │ - _context                  │ │ - _context                       │
 └──────────────┬──────────────┘ └──────────────┬──────────────┘ └────────────────┬─────────────────┘
                └───────────────────────────────┼─────────────────────────────────┘
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

## Excepciones de negocio (`Viajecitos.Services/Exceptions`)

```
                   ┌──────────────────┐
                   │ System.Exception │
                   └────────△─────────┘
             ┌──────────────┴───────────────┐
 ┌───────────┴─────────────┐   ┌────────────┴──────────────┐
 │ NotFoundException       │   │ BusinessRuleException     │
 │  ctor(string message)   │   │  ctor(string message)     │
 │  → HTTP 404             │   │  → HTTP 400               │
 └─────────────────────────┘   └───────────────────────────┘
```

| Excepción | Cuándo la lanza la BLL | Ejemplos |
|---|---|---|
| `NotFoundException` | Lo pedido no existe | carrito, destino, hotel o ítem inexistente |
| `BusinessRuleException` | La petición rompe una regla | destino y hotel juntos (o ninguno), cantidad negativa, más de 99 |

Respuesta que recibe el cliente (la arma `ApiExceptionHandler`):

```json
{ "status": 404, "title": "Recurso no encontrado", "detail": "El carrito no existe" }
```

## DTOs (`Viajecitos.Services/Dtos/CarritoDto.cs`)

```
 Entrada (lo que manda el front)            Salida (lo que devuelve la API)
 ┌───────────────────────────────┐          ┌─────────────────────────────────┐
 │ AgregarItemDto                │          │ CarritoDto                      │
 ├───────────────────────────────┤          ├─────────────────────────────────┤
 │ DestinoId : Guid?             │          │ Id    : Guid                    │
 │ HotelId   : Guid?             │          │ Items : List<ItemCarritoDto>    │
 │ Cantidad  : int  [Range 1-99] │          │ Total : decimal  (calculado)    │
 └───────────────────────────────┘          └───────────────┬─────────────────┘
 ┌───────────────────────────────┐                          │ 1..*
 │ ActualizarCantidadDto         │          ┌───────────────▼─────────────────┐
 ├───────────────────────────────┤          │ ItemCarritoDto                  │
 │ Cantidad : int  [Range 0-99]  │          ├─────────────────────────────────┤
 │   (0 = quitar el ítem)        │          │ Id, DestinoId?, HotelId?        │
 └───────────────────────────────┘          │ Nombre : string                 │
                                            │ Imagen : string  (/url/id.jpg)  │
                                            │ Cantidad : int                  │
                                            │ PrecioUnitario : decimal        │
                                            │ Subtotal : decimal (calculado)  │
                                            └─────────────────────────────────┘
```

Viven en la BLL porque son el contrato entre la API y los servicios: el servicio los recibe y los devuelve.

Por qué DTOs y no entidades:
- `Carrito.Items → ItemCarrito.Carrito → Carrito…` es un ciclo, y serializar la entidad directamente falla.
- El cliente nunca manda el precio: `PrecioUnitario` lo toma el servidor de `Destino.Price` o `Hotel.Price`.

Destino y Hotel todavía se exponen como entidad (`IDestinoService` / `IHotelService` devuelven `Destino` / `Hotel`). Pasarlos a DTO es una tarea pendiente; solo cambia el tipo de retorno del servicio.

## Entidades y relaciones (`Viajecitos.Core/Entities`)

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

## Reglas de negocio (dónde vive cada una)

| Regla | Dónde | Si no se cumple |
|---|---|---|
| Un ítem es de un destino **o** de un hotel (exactamente uno) | `CarritoService.AgregarItemAsync` | 400 |
| El precio lo pone el servidor, no el cliente | `CarritoService.ObtenerPrecioAsync` | — |
| `PrecioUnitario` se congela al agregar (si cambia `Price`, el carrito no cambia) | `CarritoService.AgregarItemAsync` | — |
| Si el producto ya está en el carrito, se suma la cantidad (no se duplica el ítem) | `CarritoService.AgregarItemAsync` | — |
| Cantidad máxima por producto: 99 (también al sumar) | `CarritoService.ValidarCantidad` + `[Range]` en DTOs | 400 |
| Cantidad negativa no permitida; `0` quita el ítem | `CarritoService.ActualizarCantidadAsync` + `[Range]` | 400 |
| Solo se modifica o quita un ítem si pertenece a **ese** carrito | `CarritoService.ValidarItemDelCarritoAsync` | 404 |
| Descuento por banco (`Destino.Discount` + `Destino.Bank`) | **Pendiente** (checkout) | — |

Otros datos de diseño:
- `Url` + `ImageId` arman la ruta de la imagen: `/{Url}/{ImageId}.jpg` (ej. `/countries/country1.jpg`). Para el carrito la arma `MapCarrito`.
- Todos los `Id` se generan en C# con `Guid.NewGuid()` (no en la base).

## Detalle de cada clase

### Controladores (`Viajecitos.API/Controllers`)

Solo traducen HTTP ↔ servicio. No tienen `if` ni `try/catch`: si algo falla, el servicio lanza una excepción y `ApiExceptionHandler` responde.

| Clase | Dependencia inyectada | Método | Verbo y ruta | Éxito |
|---|---|---|---|---|
| `DestinoController` | `IDestinoService` | `GetDestinos()` | `GET /api/Destino` | 200 + lista |
| | | `GetDestino(Guid id)` | `GET /api/Destino/{id}` | 200 |
| `HotelController` | `IHotelService` | `GetHoteles()` | `GET /api/Hotel` | 200 + lista |
| | | `GetHotel(Guid id)` | `GET /api/Hotel/{id}` | 200 |
| `CarritoController` | `ICarritoService` | ver tabla de endpoints | `/api/Carrito/...` | 201 / 200 / 204 |

Las rutas no distinguen mayúsculas: el front llama a `/api/destino` y `/api/hotel`. ASP.NET serializa en camelCase (`Name` → `name`).

### Servicios (`Viajecitos.Services`)

| Clase | Método | Qué hace |
|---|---|---|
| `DestinoService` | `ObtenerTodosAsync()` | Delega en `GetAllAsync()` |
| | `ObtenerPorIdAsync(id)` | `GetByIdAsync(id)`; si es `null` → `NotFoundException` |
| `HotelService` | (ídem para hoteles) | |
| `CarritoService` | `CrearAsync()` | Crea el carrito y lo devuelve como `CarritoDto` |
| | `ObtenerAsync(id)` | Busca el carrito (404 si no existe) y lo mapea |
| | `AgregarItemAsync(id, dto)` | Valida destino XOR hotel → busca el carrito → si el producto ya está suma la cantidad (máx 99) → si no, busca el precio y agrega el ítem |
| | `ActualizarCantidadAsync(id, itemId, cantidad)` | Valida ≥ 0 y que el ítem sea del carrito → `0` lo quita, otro valor lo actualiza (máx 99) |
| | `QuitarItemAsync(id, itemId)` | Valida que el ítem sea del carrito y lo quita |
| | `VaciarAsync(id)` | Valida que el carrito exista y borra sus ítems |

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
| | `UpdateCantidadAsync(itemId, cantidad)` | Busca el ítem con `FindAsync`; si existe cambia `Cantidad` y guarda |

Repositorios y servicios se registran como **Scoped** (una instancia por request, igual que el `DbContext`).

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

| Método | Ruta | Descripción | Respuestas |
|---|---|---|---|
| GET | `/api/Destino` | Lista todos los destinos | 200 |
| GET | `/api/Destino/{id}` | Un destino por Guid | 200 / 404 |
| GET | `/api/Hotel` | Lista todos los hoteles | 200 |
| GET | `/api/Hotel/{id}` | Un hotel por Guid | 200 / 404 |
| POST | `/api/Carrito` | Crea un carrito vacío | **201** + `CarritoDto` |
| GET | `/api/Carrito/{id}` | Carrito con ítems, subtotales y total | 200 / 404 |
| POST | `/api/Carrito/{id}/items` | Body `AgregarItemDto`. Si el producto ya está, suma la cantidad | **204** / 400 / 404 |
| PUT | `/api/Carrito/{id}/items/{itemsId}` | Body `ActualizarCantidadDto`. `0` quita el ítem | **204** / 400 / 404 |
| DELETE | `/api/Carrito/{id}/items/{itemId}` | Quita un ítem | **204** / 404 |
| DELETE | `/api/Carrito/{id}/items` | Vacía el carrito (el carrito sigue existiendo) | **204** / 404 |

Notas:
- Las operaciones que modifican el carrito devuelven **204 sin cuerpo**: el front modifica y después pide `GET /api/Carrito/{id}`.
- Los 400/404 de la BLL llegan como `{ status, title, detail }`; los 400 de `[Range]` llegan como `ValidationProblemDetails` (con `errors` por campo). En los dos casos hay `title` y `status`.
