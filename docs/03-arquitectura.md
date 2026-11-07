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
│   │ Viajecitos.API            (Presentación / UI)                  │ │
│   │   Program.cs (DI, Swagger, seeding)                            │ │
│   │   DestinoController   HotelController   [CarritoController ✗]  │ │
│   └──────────────────────────────┬─────────────────────────────────┘ │
│                                  │ hoy llama DIRECTO al repositorio  │
│   ┌ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─▼─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┐ │
│     Viajecitos.Services       (BLL)          ✗ PENDIENTE            │ │
│   └ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─┬─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┘ │
│                                  │ usa interfaces I*Repository       │
│   ┌──────────────────────────────▼─────────────────────────────────┐ │
│   │ Viajecitos.Data           (DAL)                                │ │
│   │   ApplicationDbContext · Repositories · Migrations · Seeding   │ │
│   └──────────────────────────────┬─────────────────────────────────┘ │
│                                  │                                   │
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
| **UI** | `Viajecitos.API` | Controladores, `Program.cs`, configuración, JSON de seed | ✅ Parcial (falta `CarritoController`) |
| **BE** | `Viajecitos.Core` | Entidades del dominio e interfaces de repositorio | ✅ |
| **BLL** | *(no existe)* | Reglas de negocio: total del carrito, descuento por banco, checkout | ❌ Pendiente |
| **DAL** | `Viajecitos.Data` | `DbContext`, repositorios, migraciones, seeding | ✅ |

## Dependencias entre proyectos (quién conoce a quién)

```
           ┌──────────────────┐
           │  Viajecitos.API  │
           └───┬─────────┬────┘
               │         │
               ▼         ▼
   ┌────────────────┐  ┌─────────────────┐
   │ Viajecitos.Data│─►│ Viajecitos.Core │
   └────────────────┘  └─────────────────┘
```

- **Core no depende de nadie**: no tiene paquetes ni referencias. Es el centro.
- **Data implementa** las interfaces de Core (`DestinoRepository : IDestinoRepository`).
- **API** conoce las dos: usa las interfaces de Core en los controladores y registra las implementaciones de Data en `Program.cs` (inyección de dependencias).
- Cuando se agregue la BLL, lo esperable es: `API → Services → Core`, y `Services` usando las interfaces de Core (sin referenciar Data). Solo `Program.cs` conoce Data para registrar las implementaciones.

## Flujo de una petición (ejemplo: listar destinos)

```
DestinosPage
  └─ ViajesSection
       └─ useFetchDestinos()  ── fetch('/api/destino') ──┐
                                                         │ proxy Vite
                                                         ▼
                                  DestinoController.GetDestinos()
                                         │  IDestinoRepository (inyectado)
                                         ▼
                                  DestinoRepository.GetAllAsync()
                                         │  _context.Destino.ToListAsync()
                                         ▼
                                  PostgreSQL  SELECT * FROM "Destino"
                                         │
            JSON camelCase  ◄────────────┘  (id, name, country, continent,
                                             price, discount, bank, imageId…)
       ◄─ setDestinos(data) → filterDestination() → ViajesCard × N
```

## Arranque de la API (`Program.cs`)

```
1. AddControllers / AddEndpointsApiExplorer / AddSwaggerGen
2. Lee "DefaultConnection" (User Secrets) → si falta, excepción con instrucciones
   AddDbContext<ApplicationDbContext>(UseNpgsql(connectionString))
3. DI (Scoped):  IDestinoRepository → DestinoRepository
                 IHotelRepository   → HotelRepository
                 ICarritoRepository → CarritoRepository
4. Build()
5. Si Development → UseSwagger + UseSwaggerUI
6. UseHttpsRedirection → UseAuthorization → MapControllers
7. Scope temporal → DbInitializer.InitializeAsync(context)
      MigrateAsync()   (aplica migraciones pendientes)
      si Destino vacío → carga destinos.json  (desde bin/)
      si Hotel vacío   → carga hoteles.json   (desde bin/)
8. Run()
```

No hay configuración de CORS: no hace falta en desarrollo porque el front llama a la API a través del proxy de Vite (mismo origen).
