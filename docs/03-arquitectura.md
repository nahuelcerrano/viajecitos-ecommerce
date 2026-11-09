# 03 · Arquitectura y capas

## Vista general del sistema

```
┌──────────────────────────────────────────────────────────────────────┐
│                           NAVEGADOR                                  │
│                                                                      │
│   ┌──────────────────────────────────────────────────────────────┐   │
│   │  Frontend  ·  React 18 + Vite 8  ·  http://localhost:5173    │   │
│   │                                                              │   │
│   │   Router (react-router-dom)                                  │   │
│   │      │                                                       │   │
│   │   Pages ──► Components ──► Hooks ──► Context (Cart, Filters) │   │
│   │                              │                               │   │
│   │               ┌──────────────┴──────────────┐                │   │
│   │               ▼                             ▼                │   │
│   │        src/data/*.js (mocks)        fetch('/api/...')        │   │
│   └─────────────────────────────────────────────┬────────────────┘   │
└─────────────────────────────────────────────────┼────────────────────┘
                                                  │ proxy de Vite
                                                  │ /api → :5016
                                                  ▼
┌──────────────────────────────────────────────────────────────────────┐
│  Backend  ·  ASP.NET Core Web API (.NET 10)  ·  http://localhost:5016│
│                                                                      │
│   ┌────────────────────────────────────────────────────────────────┐ │
│   │ Viajecitos.API            (UI / Presentación)                  │ │
│   │   Program.cs (DI, Swagger, seeding, manejo de excepciones)     │ │
│   │   DestinoController   HotelController   CarritoController      │ │
│   │   Handlers/ApiExceptionHandler                                 │ │
│   └──────────────────────────────┬─────────────────────────────────┘ │
│                                  │ usa I*Service                     │
│   ┌──────────────────────────────▼─────────────────────────────────┐ │
│   │ Viajecitos.Services       (BLL: reglas de negocio)             │ │
│   │   DestinoService · HotelService · CarritoService               │ │
│   │   Dtos · Exceptions (NotFound, BusinessRule) · Interfaces      │ │
│   └──────────────────────────────┬─────────────────────────────────┘ │
│                                  │ usa I*Repository (de Core)        │
│   ┌──────────────────────────────▼─────────────────────────────────┐ │
│   │ Viajecitos.Data           (DAL)                                │ │
│   │   ApplicationDbContext · Repositories · Migrations · Seeding   │ │
│   └──────────────────────────────┬─────────────────────────────────┘ │
│                                  │ implementa                        │
│   ┌──────────────────────────────┴─────────────────────────────────┐ │
│   │ Viajecitos.Core           (BE: entidades + contratos)          │ │
│   │   Entities: Destino, Hotel, Carrito, ItemCarrito               │ │
│   │   Interfaces: IDestinoRepository, IHotelRepository,            │ │
│   │               ICarritoRepository                               │ │
│   └────────────────────────────────────────────────────────────────┘ │
└──────────────────────────────────┬───────────────────────────────────┘
                                   │ EF Core 10 + Npgsql
                                   ▼
┌──────────────────────────────────────────────────────────────────────┐
│  PostgreSQL 16  ·  Docker (viajecitos_postgres)  ·  localhost:5432   │
│  Base "viajecitos" · Tablas: Destino, Hotel, Carrito, ItemCarrito,   │
│  __EFMigrationsHistory                                               │
└──────────────────────────────────────────────────────────────────────┘
```

## Equivalencia con N-Capas de DAS (UI → BE → BLL → DAL)

| Capa DAS | Proyecto | Contenido | Estado |
|---|---|---|---|
| **UI** | `Viajecitos.API` | Controladores (solo HTTP), `ApiExceptionHandler`, `Program.cs`, configuración, JSON de seed | ✅ |
| **BE** | `Viajecitos.Core` | Entidades del dominio e interfaces de repositorio | ✅ |
| **BLL** | `Viajecitos.Services` | Servicios con las reglas de negocio, DTOs, excepciones de negocio | ✅ (faltan checkout y descuento por banco) |
| **DAL** | `Viajecitos.Data` | `DbContext`, repositorios, migraciones, seeding | ✅ |

### Responsabilidad de cada capa

| Capa | Hace | No hace |
|---|---|---|
| Controlador | Recibe HTTP, llama al servicio, elige el código de éxito (200/201/204) | Reglas de negocio, acceso a datos, validaciones con `if` |
| Servicio | Valida reglas, decide qué guardar, convierte entidades a DTOs, lanza `NotFoundException` / `BusinessRuleException` | Conocer HTTP (`IActionResult`, status codes) ni EF Core |
| Repositorio | Lee y escribe en la base con EF Core | Decidir si algo está permitido |

## Dependencias entre proyectos (quién conoce a quién)

```
              ┌──────────────────┐
              │  Viajecitos.API  │
              └──┬────────────┬──┘
                 │            │ (solo Program.cs, para registrar
                 ▼            ▼  los repositorios en la DI)
 ┌─────────────────────┐   ┌─────────────────┐
 │ Viajecitos.Services │   │ Viajecitos.Data │
 └──────────┬──────────┘   └────────┬────────┘
            │                       │
            ▼                       ▼
          ┌───────────────────────────┐
          │      Viajecitos.Core      │
          └───────────────────────────┘
```

- **Core no depende de nadie**: no tiene paquetes ni referencias. Es el centro.
- **Services** depende solo de Core: usa las **interfaces** de repositorio, nunca las clases de Data. Si alguna vez pide referenciar a Data, algo quedó mal ubicado.
- **Data** implementa las interfaces de Core (`DestinoRepository : IDestinoRepository`).
- **API** referencia Services (los controladores usan `I*Service`) y Data (solo `Program.cs`, para registrar las implementaciones de los repositorios).

## Manejo de errores entre capas

```
CarritoService                        ApiExceptionHandler (API)             Cliente
──────────────                        ─────────────────────────             ───────
throw NotFoundException("…")     ──►  404 { status, title, detail }   ──►   res.detail
throw BusinessRuleException("…") ──►  400 { status, title, detail }   ──►   res.detail
cualquier otra excepción         ──►  no la maneja → 500 (ProblemDetails por defecto)

[Range] de los DTOs              ──►  400 automático de [ApiController] (ValidationProblemDetails)
```

La BLL no sabe nada de HTTP: solo lanza excepciones con un mensaje para el usuario. La traducción a código de estado está en un único lugar (`ApiExceptionHandler`), así los controladores no necesitan `try/catch` ni `if (x == null) return NotFound()`.

## Flujo de una petición (ejemplo: agregar al carrito)

```
Front ── POST /api/Carrito/{id}/items  { destinoId, cantidad } ──┐
                                                                 │ proxy Vite
                                                                 ▼
CarritoController.AgregarItem(id, dto)        ([Range] ya validado por [ApiController])
        │  ICarritoService (inyectado)
        ▼
CarritoService.AgregarItemAsync(id, dto)
        ├─ ¿destino XOR hotel?          no → BusinessRuleException → 400
        ├─ carrito = ICarritoRepository.GetByIdAsync(id)
        │                                null → NotFoundException → 404
        ├─ ¿ya está el producto?         sí → suma cantidad (máx 99) → UpdateCantidadAsync
        ├─ precio = IDestinoRepository / IHotelRepository .GetByIdAsync(...).Price
        └─ ICarritoRepository.AddItemAsync(id, new ItemCarrito { ... })
                │
                ▼
        PostgreSQL  INSERT INTO "ItemCarrito" ...
        │
Front ◄─ 204 No Content   (después el front pide GET /api/Carrito/{id})
```

## Arranque de la API (`Program.cs`)

```
 1. AddControllers / AddEndpointsApiExplorer / AddSwaggerGen
 2. Lee "DefaultConnection" (User Secrets) → si falta, excepción con instrucciones
    AddDbContext<ApplicationDbContext>(UseNpgsql(connectionString))
 3. DI (Scoped) DAL:  IDestinoRepository → DestinoRepository
                      IHotelRepository   → HotelRepository
                      ICarritoRepository → CarritoRepository
 4. DI (Scoped) BLL:  IDestinoService    → DestinoService
                      IHotelService      → HotelService
                      ICarritoService    → CarritoService
 5. AddExceptionHandler<ApiExceptionHandler>() + AddProblemDetails()
 6. Build()
 7. UseExceptionHandler()          ← primero, para atrapar todo lo que viene después
 8. Si Development → UseSwagger + UseSwaggerUI
 9. UseHttpsRedirection → UseAuthorization → MapControllers
10. Scope temporal → DbInitializer.InitializeAsync(context)
       MigrateAsync()   (aplica migraciones pendientes)
       si Destino vacío → carga destinos.json  (desde bin/)
       si Hotel vacío   → carga hoteles.json   (desde bin/)
11. Run()
```

No hay configuración de CORS: no hace falta en desarrollo porque el front llama a la API a través del proxy de Vite (mismo origen).
