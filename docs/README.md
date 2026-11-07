# Documentación técnica — Viajecitos

E-commerce de viajes: SPA en React que consume una API REST en .NET 10 con PostgreSQL en Docker.
Esta carpeta describe **cómo está hecho el proyecto hoy** (relevado del código el 07/11/2026). Si cambia el código, actualizar el documento que corresponda en el mismo commit.

| # | Documento | Contenido |
|---|---|---|
| 01 | [Tecnologías y paquetes](01-tecnologias-y-paquetes.md) | Stack, versiones, NuGet y npm con para qué se usa cada uno |
| 02 | [Cómo ejecutar](02-como-ejecutar.md) | Comandos de Docker, .NET, EF Core (migraciones) y Yarn |
| 03 | [Arquitectura](03-arquitectura.md) | Diagrama de capas en ASCII, equivalencia con N-Capas de DAS, flujo de una petición |
| 04 | [Backend: modelo de clases](04-backend-modelo-de-clases.md) | Entidades, interfaces, repositorios, controladores, relaciones y endpoints |
| 05 | [Frontend: componentes](05-frontend-componentes.md) | Providers, rutas, contextos, hooks, árbol de componentes y props |

## Estado actual

| Área | Estado |
|---|---|
| Base de datos (Docker + migraciones) | ✅ Migraciones automáticas al iniciar la API · credenciales fuera del repo |
| API de catálogo (Destino, Hotel) | ✅ `GET` listado y por id |
| Carrito en backend | 🟡 Entidades + repositorio listos, **sin controlador** |
| Capa de servicios (BLL) | ❌ No existe; los controladores llaman al repositorio |
| DTOs | ❌ Se exponen las entidades |
| Front conectado a la API | 🟡 Solo `ViajesSection` y `HotelSection` (páginas `/viajes`, `/viajes/destinos`, `/viajes/hoteles`). El resto sigue con mocks |
| Carrito en front | ⚠️ En memoria y basado en ids del mock (ver abajo) |
| Checkout / autenticación | ❌ Pendiente |

## Problemas detectados

Encontrados al leer el código para esta documentación. **No se corrigió nada**: quedan listados para resolverlos en tareas aparte.

### Backend / infraestructura

1. ~~**Volumen de Docker mal montado.** `docker-compose.yml` monta `postgres_data:/var/lib/postgresql/postgres_data`; Postgres escribe en `/var/lib/postgresql/data`. Los datos se pierden al recrear el contenedor.~~ **Resuelto (07/11/2026):** ahora monta en `/var/lib/postgresql/data`.
2. ~~**`EnsureCreatedAsync()` en `DbInitializer`.** No usa migraciones. Si la API arranca antes de `dotnet ef database update`, crea las tablas sin historial y las migraciones posteriores fallan. Conviene reemplazarlo por `context.Database.MigrateAsync()`.~~ **Resuelto (07/11/2026):** la API aplica las migraciones al arrancar.
3. ~~**Contraseña de la base versionada.** `appsettings.json` (que sí se sube a Git) tiene `Password=password123`. Para desarrollo local alcanza, pero lo prolijo es moverla a *User Secrets* o a `appsettings.Development.json` (que ya está en `.gitignore`).~~ **Resuelto (07/11/2026):** la API la lee de *User Secrets* y Docker Compose de `.env` (hay un `.env.example` de plantilla). Ojo: `password123` sigue en el historial de Git, por eso conviene usar otra contraseña.
4. **Sin regla "destino O hotel" en `ItemCarrito`.** Nada impide un ítem con los dos ids o con ninguno. Validarlo en la futura BLL.
5. ~~**El seeding depende de la carpeta de ejecución** (`Directory.GetCurrentDirectory()`). Usar `AppContext.BaseDirectory` y copiar los JSON al output lo haría independiente.~~ **Resuelto (07/11/2026):** se hizo exactamente eso.

### Frontend

6. **"Comprar" no funciona con datos de la API.** `ViajesCard` llama `addToCart(guid)`, pero `CartContext` solo tiene claves `country1…N` del mock: `undefined + 1` da `NaN`. Además `Cart` recorre el mock `destinos`, así que los ítems que vienen de la API (y todos los hoteles) nunca aparecen en el carrito. Se resuelve al conectar el carrito con la API.
7. **`DestinoCard` espera la prop `city`**, pero los destinos tienen `name`: en el home las tarjetas muestran el país sin ciudad.
8. **Links rotos a `/contact`** en `Footer` y `FooterContact` (la ruta es `/contacto`): caen en el comodín y van a `/home`.
9. **`removeFromCart` permite cantidades negativas.**
10. **Hooks de fetch sin control de error HTTP.** No revisan `response.ok`; un 404/500 termina en error de parseo o en lista vacía sin aviso al usuario.
11. **Código muerto:** `viajes/pages/index.js` exporta `TripPage` y `OfficePage`, que no existen; `data/verano.js` no se usa; `ViajesSection` y `HotelSection` importan mocks que ya no usan; `useFetchDestinos` importa `use` sin usarlo.
12. **Prop con nombre inconsistente:** `numCardsToShow` (ViajesSection) vs `numCardstoShow` (HotelSection).

### README principal

13. ~~El *Roadmap* marca como hechos la conexión al backend, la autenticación y los hoteles en el carrito, que todavía están pendientes. También menciona un formulario de **registro** que no existe (solo hay contacto).~~ **Resuelto (07/11/2026):** Roadmap actualizado, se quitó "Registro", se corrigió la ruta de instalación (`cd viajecitos-react/Frontend`) y se agregó el link a esta carpeta.
