# ✈️ Viajecitos

Viajecitos es una Single Page Application (SPA) que simula un e-commerce integral de viajes y turismo. Permite a los usuarios explorar destinos internacionales, simular reservas de alojamiento y adquirir paquetes de guías turísticas. 

Este proyecto fue desarrollado para aplicar y consolidar conceptos avanzados de desarrollo frontend con React, incluyendo el manejo de estado global mediante Context API, validación y gestión de formularios, enrutamiento dinámico y consumo de una API REST propia en .NET con PostgreSQL (en desarrollo), que va reemplazando a los datos simulados (mocks).

[**Ver demo en vivo**](https://viajecitos-react.vercel.app/home)

<img width="100%" alt="Viajecitos Screenshot" src="https://i.imgur.com/ZVYMqfH.jpeg">


## Características Principales

*   **Exploración de Destinos:** Catálogo dinámico de países y ciudades.
*   **Filtros de Búsqueda:** Filtrado de destinos y hoteles por continente y rango de precio en tiempo real.
*   **Carrito de Compras:** Sistema de gestión de compras funcional, permitiendo agregar, sumar, restar y limpiar el carrito utilizando Context API.
*   **Contacto:** Formulario controlado y validado estrictamente utilizando expresiones regulares.
*   **UI/UX Moderna:** Interfaz responsiva y fluida con componentes pre-diseñados y animaciones.


## Tecnologías Utilizadas

*   **[React](https://reactjs.org/)** - Biblioteca principal para la construcción de interfaces de usuario.
*   **[React Router DOM](https://reactrouter.com/)** - Gestión de rutas de la SPA.
*   **[React Hook Form](https://react-hook-form.com/)** - Gestión y validación eficiente de formularios.
*   **[HeroUI](https://www.heroui.com/)** *(anteriormente NextUI)* - Librería de componentes accesibles y personalizables.
*   **[Tailwind CSS](https://tailwindcss.com/)** - Framework de CSS de utilidad (Utility-first) para un estilado ágil.
*   **[Framer Motion](https://www.framer.com/motion/)** - Librería para la creación de animaciones declarativas.
*   **[Vite](https://vitejs.dev/)** - Entorno de desarrollo y empaquetador ultrarrápido.


## Instalación y Uso Local

Sigue estos pasos para correr el proyecto en tu entorno local:

1. Clonar el repositorio:
```bash
git clone https://github.com/nahuelcerrano/viajecitos-react.git
```

2. Acceder al directorio del frontend:
```bash
cd viajecitos-react/Frontend
```

3. Instalar las dependencias (se recomienda Yarn):
```bash
yarn install
```

4. Iniciar el servidor de desarrollo:
```bash
yarn dev
```


> Esto levanta solo el frontend. Para correr el proyecto completo (PostgreSQL en Docker + API en .NET 10 + frontend) seguí la guía [Cómo ejecutar](docs/02-como-ejecutar.md).


## Documentación técnica

La carpeta [`docs/`](docs/README.md) describe cómo está construido el proyecto:

| Documento | Contenido |
|---|---|
| [Índice y estado actual](docs/README.md) | Qué está hecho, qué falta y problemas conocidos |
| [Tecnologías y paquetes](docs/01-tecnologias-y-paquetes.md) | Stack, versiones y dependencias (npm y NuGet) |
| [Cómo ejecutar](docs/02-como-ejecutar.md) | Comandos de Docker, .NET, EF Core y Yarn |
| [Arquitectura](docs/03-arquitectura.md) | Diagrama de capas y flujo de una petición |
| [Backend: modelo de clases](docs/04-backend-modelo-de-clases.md) | Entidades, repositorios, controladores y endpoints |
| [Frontend: componentes](docs/05-frontend-componentes.md) | Rutas, contextos, hooks, componentes y props |


## Roadmap (Próximas Mejoras)

* [x] Backend en .NET 10 (N-Capas) con PostgreSQL en Docker y EF Core.
* [x] Catálogo de destinos y hoteles servido desde la API.
* [x] Listados de destinos y hoteles del frontend consumiendo la API.
* [ ] Capa de servicios (BLL) y DTOs en el backend.
* [ ] Carrito de compras conectado a la API (incluye hoteles en el carrito).
* [ ] Checkout.
* [ ] Reemplazar los mocks restantes (home, servicios, carrito).
* [ ] Implementación de sistema real de autenticación (Login/Registro).


## Contacto

Si te interesa mi trabajo o quieres charlar sobre desarrollo, puedes encontrarme aquí:
- [LinkedIn](https://www.linkedin.com/in/nahuel-cerrano/) | [GitHub](https://github.com/nahuelcerrano)
