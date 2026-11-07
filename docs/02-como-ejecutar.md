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

### Configuración inicial (una sola vez)

Las credenciales no están en el repo. Docker Compose las lee de un archivo `.env` en la raíz (ignorado por Git):

```bash
# Windows (PowerShell / CMD)
copy .env.example .env
# Linux / macOS
cp .env.example .env
```

Abrir `.env` y reemplazar `cambiar_esta_password` por una contraseña propia. Es la misma que va en la connection string del backend (paso 2).

### Comandos

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
| Usuario / contraseña | `POSTGRES_USER` / `POSTGRES_PASSWORD` del `.env` |

Los datos se guardan en el volumen `postgres_data` (montado en `/var/lib/postgresql/data`), así que sobreviven a `docker compose down`. Solo `docker compose down -v` los borra.

> Postgres toma usuario y contraseña **solo la primera vez** que inicializa el volumen. Si cambiás la contraseña en `.env` después, hay que borrar el volumen (`docker compose down -v`) para que se aplique.

---

## 2. Backend (.NET 10)

### Configuración inicial (una sola vez): connection string con User Secrets

La connection string **no** está en `appsettings.json` (ese archivo se sube a Git). Se guarda con *User Secrets*, que la deja fuera del repo, en el perfil de tu usuario (`%APPDATA%\Microsoft\UserSecrets\` en Windows):

```bash
cd Backend/Viajecitos/Viajecitos.API
dotnet user-secrets set "ConnectionStrings:DefaultConnection" "Host=localhost;Port=5432;Database=viajecitos;Username=postgres;Password=<la_misma_del_.env>"

# Ver lo que quedó guardado
dotnet user-secrets list
```

En Visual Studio también se puede: click derecho en **Viajecitos.API → Administrar secretos de usuario**, y pegar:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Host=localhost;Port=5432;Database=viajecitos;Username=postgres;Password=<la_misma_del_.env>"
  }
}
```

Si falta este paso, la API no arranca y muestra *"Falta la connection string 'DefaultConnection'…"* con el comando para configurarla.

> User Secrets solo se cargan en el entorno **Development** (los perfiles `http` y `https` ya lo usan).

### Opción A — Terminal

```bash
cd Backend/Viajecitos
dotnet restore
dotnet build
dotnet run --project Viajecitos.API --launch-profile http    # http://localhost:5016
# o con HTTPS:
dotnet run --project Viajecitos.API --launch-profile https   # https://localhost:7116 + http://localhost:5016
```

Al arrancar, la API **aplica sola las migraciones pendientes** (`Database.MigrateAsync()`) y, si las tablas `Destino` y `Hotel` están vacías, las carga desde `destinos.json` y `hoteles.json`. No hace falta correr `dotnet ef database update` para usarla. Los JSON se copian a `bin/` al compilar, así que la API se puede ejecutar desde cualquier carpeta.

Probar:

- Swagger: <http://localhost:5016/swagger>
- `GET http://localhost:5016/api/Destino`
- `GET http://localhost:5016/api/Hotel`
- También está `Viajecitos.API/Viajecitos.API.http` para probar desde Visual Studio.


### Opción B — Visual Studio 2026

1. Abrir `Backend/Viajecitos/Viajecitos.slnx`.
2. Click derecho en **Viajecitos.API → Establecer como proyecto de inicio**.
3. Elegir el perfil **http** en la barra superior y presionar F5.
4. Para manejar migraciones a mano, desde la *Consola del Administrador de paquetes* (proyecto predeterminado: `Viajecitos.Data`):
   ```powershell
   Update-Database
   Add-Migration NombreDeLaMigracion
   ```

### Comandos de migraciones (EF Core)

```bash
cd Backend/Viajecitos

# Crear una migración nueva después de cambiar entidades o el DbContext
dotnet ef migrations add NombreDeLaMigracion --project Viajecitos.Data --startup-project Viajecitos.API

# Aplicar migraciones pendientes sin levantar la API (opcional: la API ya lo hace al arrancar)
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
# Una sola vez: crear .env (desde .env.example) y configurar User Secrets (ver arriba)

# Terminal 1 — base de datos
docker compose up -d

# Terminal 2 — backend (aplica migraciones y seeding solo)
cd Backend/Viajecitos
dotnet run --project Viajecitos.API --launch-profile http

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
