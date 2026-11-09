# 01 · Tecnologías y paquetes

> Versiones relevadas del código el **07/11/2026** (`*.csproj`, `package.json`, `yarn.lock`, `docker-compose.yml`).
> Cuando se actualice un paquete, actualizar también esta tabla.

## Resumen del stack

| Capa | Tecnología | Versión |
|---|---|---|
| Frontend | React | 18.3.1 |
| Frontend | Vite | 8.2.1 |
| Frontend | JavaScript (JSX), sin TypeScript | — |
| Backend | .NET SDK / runtime (`net10.0`) | 10 |
| Backend | ASP.NET Core Web API (controladores) | 10 |
| ORM | Entity Framework Core | 10.0.11 |
| Base de datos | PostgreSQL (imagen `postgres:16-alpine`) | 16 |
| Contenedores | Docker + Docker Compose (`version: '3.8'`) | — |
| IDE backend | Visual Studio 2026 (solución `.slnx`) | — |
| Gestor de paquetes front | Yarn classic (lockfile v1) | 1.x |
| Deploy front | Vercel (`vercel.json` con rewrite para SPA) | — |

### Requisitos de entorno

| Herramienta | Versión mínima | Por qué |
|---|---|---|
| Node.js | `^20.19.0` o `>=22.12.0` | Lo exigen Vite 8 y `@vitejs/plugin-react` 6 (`engines.node`) |
| Yarn | 1.x | El `yarn.lock` es formato v1 |
| .NET SDK | 10.x | `TargetFramework` = `net10.0` en los 3 proyectos |
| dotnet-ef (herramienta global) | 10.x | Para crear/aplicar migraciones desde la terminal |
| Docker Desktop | con Compose v2 | Levanta PostgreSQL |

---

## Backend — paquetes NuGet

Solución: `Backend/Viajecitos/Viajecitos.slnx` (4 proyectos, todos `net10.0`, `Nullable` e `ImplicitUsings` habilitados).

| Proyecto | Paquete | Versión | Para qué se usa |
|---|---|---|---|
| **Viajecitos.API** | Microsoft.AspNetCore.OpenApi | 10.0.11 | Metadatos OpenAPI |
| | Swashbuckle.AspNetCore | 10.2.3 | Swagger UI en `/swagger` (solo en Development) |
| | Microsoft.EntityFrameworkCore.Design | 10.0.11 | Necesario para `dotnet ef` (la API es el *startup project*). `PrivateAssets=all` |
| **Viajecitos.Services** | — (sin paquetes) | — | BLL: servicios, DTOs, excepciones de negocio |
| **Viajecitos.Core** | — (sin paquetes) | — | Entidades e interfaces puras |
| **Viajecitos.Data** | Microsoft.EntityFrameworkCore | 10.0.11 | ORM |
| | Microsoft.EntityFrameworkCore.Relational | 10.0.11 | Soporte relacional (migraciones, SQL) |
| | Npgsql.EntityFrameworkCore.PostgreSQL | 10.0.3 | Proveedor de EF Core para PostgreSQL |

Referencias entre proyectos:

```
Viajecitos.API      ──► Viajecitos.Services
Viajecitos.API      ──► Viajecitos.Data      (solo para la DI en Program.cs)
Viajecitos.API      ──► Viajecitos.Core
Viajecitos.Services ──► Viajecitos.Core
Viajecitos.Data     ──► Viajecitos.Core
Viajecitos.Core     ──► (nada)
```

---

## Frontend — paquetes npm

`Frontend/package.json`. "Declarada" es el rango del `package.json`; "Instalada" es la versión que resolvió el `yarn.lock`.

### dependencies

| Paquete | Declarada | Instalada | Para qué se usa |
|---|---|---|---|
| react | ^18.2.0 | 18.3.1 | Librería de UI |
| react-dom | ^18.2.0 | 18.3.1 | Render en el navegador |
| react-router-dom | ^7.18.2 | 7.18.2 | Ruteo de la SPA (`BrowserRouter`, `Routes`, `Navigate`, `useNavigate`) |
| react-hook-form | ^7.85.0 | 7.85.0 | Formulario de contacto con validación por regex |
| @heroui/react | 2 | 2.8.10 | Componentes (`Button`, `Card`, `Input`, `Image`, `Select`…) |
| @heroui/theme | 2 | 2.4.26 | Plugin de Tailwind de HeroUI (`tailwind.config.js`) |
| framer-motion | ^13.1.0 | 13.1.0 | **No se importa directo**: es *peer dependency* de HeroUI (animaciones internas) |
| @react-aria/utils | ^3.34.1 | 3.34.1 | **No se importa directo**: dependencia interna de HeroUI, fijada a mano |
| react-icons | ^5.7.0 | 5.7.0 | Íconos (`fa`, `bs`, `ai`, `go`) |

### devDependencies

| Paquete | Declarada | Instalada | Para qué se usa |
|---|---|---|---|
| vite | ^8.2.1 | 8.2.1 | Dev server y build |
| @vitejs/plugin-react | ^6.0.5 | 6.0.5 | Soporte JSX / Fast Refresh |
| tailwindcss | ^3.4.1 | 3.4.19 | CSS utilitario (`darkMode: "class"`) |
| postcss | ^8.5.26 | 8.5.26 | Pipeline de CSS para Tailwind |
| autoprefixer | ^10.5.4 | 10.5.4 | Prefijos de navegador |
| @types/react | ^18.2.57 | 18.3.31 | Tipos para el editor (el proyecto no usa TS) |
| @types/react-dom | ^18.2.19 | 18.3.7 | Ídem |

### Recursos externos cargados por CDN

| Recurso | Dónde | Uso |
|---|---|---|
| animate.css 4.1.1 | `index.html` | Animaciones del `Navbar` (`animate__slideInDown`, `animate__fadeIn`) |
| Google Fonts (Birthstone, Italianno, Maven Pro) | `src/index.css` | Tipografías |

### Estilos

Conviven tres formas de estilar: clases de **Tailwind**, **CSS Modules** (`*.module.css` por componente) y algunos **estilos inline** (imágenes de fondo calculadas). Hay un `cart.css` global para el carrito.
