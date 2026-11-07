# 02 · Cómo ejecutar el proyecto

Orden recomendado: **1) Base de datos → 2) Backend → 3) Frontend**.
Todos los comandos se escriben desde la raíz del repo (`viajecitos-react/`) salvo que se indique otra carpeta.

## 0. Requisitos (una sola vez)

```bash
node -v          # debe ser 20.19+ o 22.12+
yarn -v          # 1.x  (si no está: npm install -g yarn)
dotnet --version # 10.x
docker -v

# Herramienta de migraciones de EF Core
dotnet tool install --global dotnet-ef --version 10.*
# (si ya la tenés)  dotnet tool update --global dotnet-ef --version 10.*
```

---

## 1. Base de datos (PostgreSQL en Docker)

```bash
# Levantar el contenedor (en segundo plano)
docker compose up -d

# Verificar que está corriendo
docker ps                        # debe aparecer "viajecitos_postgres"
docker compose logs -f db        # ver logs (Ctrl+C para salir)

# Entrar a la consola de Postgres
docker exec -it viajecitos_postgres psql -U postgres -d viajecitos
#   \dt                 → listar tablas
#   SELECT COUNT(*) FROM "Destino";
#   \q                  → salir

# Apagar el contenedor (los datos quedan en el volumen)
docker compose down

# Borrar TODO, incluido el volumen (base vacía la próxima vez)
docker compose down -v
```

Datos de conexión (definidos en `docker-compose.yml` y `appsettings.json`):

| Dato | Valor |
|---|---|
| Host / puerto | `localhost:5432` |
| Base | `viajecitos` |
| Usuario / contraseña | `postgres` / `password123` |

> ⚠️ El volumen está montado en `/var/lib/postgresql/postgres_data`, pero Postgres guarda en `/var/lib/postgresql/data`. Mientras no se corrija, **los datos no sobreviven a recrear el contenedor**. Ver [README → Problemas detectados](README.md#problemas-detectados).

---

## 2. Backend (.NET 10)

### Opción A — Terminal

```bash
cd Backend/Viajecitos
dotnet restore
dotnet build

# Crear las tablas aplicando las migraciones (hacerlo ANTES del primer run)
dotnet ef database update --project Viajecitos.Data --startup-project Viajecitos.API

# Correr la API desde su carpeta (importante: ver nota del seeding)
cd Viajecitos.API
dotnet run --launch-profile http        # http://localhost:5016
# o con HTTPS:
dotnet run --launch-profile https       # https://localhost:7116 + http://localhost:5016
```

Probar:

- Swagger: <http://localhost:5016/swagger>
- `GET http://localhost:5016/api/Destino`
- `GET http://localhost:5016/api/Hotel`
- También está `Viajecitos.API/Viajecitos.API.http` para probar desde Visual Studio.

> **Nota del seeding:** `DbInitializer` busca `destinos.json` y `hoteles.json` en `Directory.GetCurrentDirectory()`. Si corrés `dotnet run` desde otra carpeta, no los encuentra y muestra *"No se encontró el archivo de destinos"*. Por eso conviene correrlo parado en `Viajecitos.API/` (Visual Studio ya lo hace así).

> **Nota del orden:** `DbInitializer` llama a `EnsureCreatedAsync()`. Si la API arranca contra una base vacía **antes** de aplicar migraciones, crea las tablas sin el historial de migraciones y después `dotnet ef database update` falla con *"relation already exists"*. Solución: `docker compose down -v`, aplicar migraciones y recién ahí correr la API.

### Opción B — Visual Studio 2026

1. Abrir `Backend/Viajecitos/Viajecitos.slnx`.
2. Click derecho en **Viajecitos.API → Establecer como proyecto de inicio**.
3. Elegir el perfil **http** en la barra superior y presionar F5.
4. Migraciones desde la *Consola del Administrador de paquetes* (proyecto predeterminado: `Viajecitos.Data`):
   ```powershell
   Update-Database
   Add-Migration NombreDeLaMigracion
   ```

### Comandos de migraciones (EF Core)

```bash
cd Backend/Viajecitos

# Crear una migración nueva después de cambiar entidades o el DbContext
dotnet ef migrations add NombreDeLaMigracion --project Viajecitos.Data --startup-project Viajecitos.API

# Aplicar migraciones pendientes
dotnet ef database update --project Viajecitos.Data --startup-project Viajecitos.API

# Listar migraciones
dotnet ef migrations list --project Viajecitos.Data --startup-project Viajecitos.API

# Deshacer la última migración (solo si NO fue aplicada)
dotnet ef migrations remove --project Viajecitos.Data --startup-project Viajecitos.API
```

Migraciones existentes: `20260827145128_InitialCreate` (Destino, Hotel) y `20260827174715_AddShoppingCarts` (Carrito, ItemCarrito).

---

## 3. Frontend (React + Vite)

```bash
cd Frontend
yarn install       # instalar dependencias
yarn dev           # dev server → http://localhost:5173
yarn build         # build de producción en Frontend/dist/
yarn preview       # servir el build localmente
```

- En desarrollo, Vite redirige todo lo que empiece con `/api` a `http://localhost:5016` (ver `vite.config.js`). Por eso **la API tiene que estar corriendo** para que carguen `/viajes`, `/viajes/destinos` y `/viajes/hoteles`; si no, esas secciones quedan vacías (el error aparece en la consola del navegador).
- El resto de las páginas (home, servicios, nosotros, contacto) usa datos mock y funciona sin backend.
- El deploy en Vercel (<https://viajecitos-react.vercel.app>) no tiene backend: el proxy de Vite solo existe en desarrollo.

---

## Resumen rápido (todo junto)

```bash
# Terminal 1 — base de datos
docker compose up -d

# Terminal 2 — backend
cd Backend/Viajecitos
dotnet ef database update --project Viajecitos.Data --startup-project Viajecitos.API
cd Viajecitos.API && dotnet run --launch-profile http

# Terminal 3 — frontend
cd Frontend && yarn install && yarn dev
```

| Servicio | URL |
|---|---|
| Frontend | http://localhost:5173 |
| API (http) | http://localhost:5016 |
| API (https) | https://localhost:7116 |
| Swagger | http://localhost:5016/swagger |
| PostgreSQL | localhost:5432 |
