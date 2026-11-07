# 05 · Frontend: componentes, props, contextos y rutas

Carpeta: `Frontend/src/`

```
src/
├── main.jsx               Punto de entrada (BrowserRouter + ScrollToTop)
├── ViajecitosApp.jsx      Providers globales
├── index.css              Tailwind + fuentes + estilos globales
├── router/                AppRouter (rutas de primer nivel)
├── context/               Cart.jsx, Filters.jsx
├── helpers/               ScrollToTop.jsx
├── data/                  Mocks (destinos, hoteles, ads, banks, viajes, nosotros, ico)
├── ui/components/         Navbar, Footer, Newsletter, SectionImg(+Card)
├── contacto/              Página de contacto (navbar/footer propios)
└── viajes/
    ├── routes/            ViajesRoutes (rutas internas)
    ├── pages/             Home, About, Service, Viajes, Destinos, Hoteles
    ├── components/        Secciones y tarjetas
    ├── hooks/             useFetchDestinos, useFetchHoteles, useFilters
    └── helpers/           getPageByName
```

---

## 1. Árbol de providers

```
main.jsx
└── <React.StrictMode>
    └── <BrowserRouter>
        ├── <ScrollToTop/>              sube el scroll al cambiar de ruta
        └── <ViajecitosApp/>
            └── <HeroUIProvider>        tema/contexto de HeroUI
                └── <CartProvider>      CartContext
                    └── <FiltersProvider>   FiltersContext
                        └── <AppRouter/>
```

Cualquier componente debajo de `AppRouter` puede leer `CartContext` y `FiltersContext`.

---

## 2. Rutas

### Primer nivel — `router/AppRouter.jsx`

| Ruta | Componente | Layout |
|---|---|---|
| `/contacto` | `ContactPage` | Propio: `NavbarContact` + `FooterContact` |
| `/reedirecion` | `ContactFormRedic` | Ninguno (pantalla de "gracias", vuelve a `/` a los 3,5 s) |
| `/*` | `ViajesRoutes` | `Navbar` + contenido + `Footer` |

### Rutas internas — `viajes/routes/ViajesRoutes.jsx`

| Ruta | Página | Fuente de datos principal |
|---|---|---|
| `/home` | `HomePage` | Mocks |
| `/about` | `AboutPage` | Texto fijo |
| `/servicios` | `ServicePage` | Mocks |
| `/viajes` | `ViajesPage` | **API** (destinos y hoteles) + mocks (slider) |
| `/viajes/destinos` | `DestinosPage` | **API** `/api/destino` + filtros |
| `/viajes/hoteles` | `HotelesPage` | **API** `/api/hotel` + filtros |
| `/compras` | `Cart` | `CartContext` + mock `destinos` |
| cualquier otra | `<Navigate to='/home'/>` | — |

```
/
├── contacto ─────────────► ContactPage
├── reedirecion ──────────► ContactFormRedic ──(3,5 s)──► /
└── * ────────────────────► ViajesRoutes
                             ├── home
                             ├── about
                             ├── servicios
                             ├── viajes
                             │   ├── destinos
                             │   └── hoteles
                             ├── compras
                             └── * ──► redirect /home
```

---

## 3. Contextos

### `CartContext` — `context/Cart.jsx`

Estado: `cartItems` = objeto `{ [id]: cantidad }`. Se inicializa con una clave por destino del mock (`country1`, `country2`, … en 0).

| Valor expuesto | Tipo | Qué hace |
|---|---|---|
| `cartItems` | `{ [id: string]: number }` | Cantidades por id |
| `addToCart(itemId)` | función | Suma 1 a `cartItems[itemId]` |
| `removeFromCart(itemId)` | función | Resta 1 (no impide bajar de 0) |
| `clearCart()` | función | Vuelve al estado inicial (todo en 0) |
| `getTotalCartAmount()` | función → number | Suma `cantidad × price` buscando cada id en el mock `destinos` |

Consumidores: `ViajesCard` (addToCart), `CartItem` (cartItems, addToCart, removeFromCart), `Cart` (cartItems, clearCart, getTotalCartAmount).

> El carrito es **solo de memoria** (se pierde al recargar) y depende de los ids del mock. Ver [README → Problemas detectados](README.md#problemas-detectados).

### `FiltersContext` — `context/Filters.jsx`

| Valor expuesto | Tipo | Qué hace |
|---|---|---|
| `filters` | `{ DestinosPage: {continent, minPrice}, HotelesPage: {continent, minPrice} }` | Filtros guardados **por página** (valor inicial `{ continent: 'all', minPrice: 0 }`) |
| `setFilters` | setState | Actualiza los filtros |
| `currentPage` | `'default' \| 'DestinosPage' \| 'HotelesPage'` | Página activa |
| `setCurrentPage` | setState | La setean `DestinosPage` y `HotelesPage` al montarse y vuelven a `'default'` al desmontarse |

Se consume a través del hook `useFilters` (y directo en `DestinosPage` / `HotelesPage` para `setCurrentPage`).

---

## 4. Hooks y helpers

| Nombre | Archivo | Devuelve | Detalle |
|---|---|---|---|
| `useFetchDestinos()` | `viajes/hooks/useFetchDestinos.js` | `{ destinos, isLoading }` | `fetch('/api/destino')` una vez al montar |
| `useFetchHoteles()` | `viajes/hooks/useFetchHoteles.js` | `{ hoteles, isLoading }` | `fetch('/api/hotel')` una vez al montar |
| `useFilters()` | `viajes/hooks/useFilters.js` | `{ activeFilters, filterDestination(items), updateFilters(newValues) }` | Solo filtra si `currentPage` es `DestinosPage` o `HotelesPage`; en otra página devuelve la lista sin tocar. Criterio: `price >= minPrice` y (`continent === 'all'` o igual al del ítem) |
| `getPageByName(page)` | `viajes/helpers/getPageByName.js` | elementos de `viajes` (mock) con ese `page` | Valida `home, viajes, servicios, about, cart`; si no, lanza `Error` |
| `ScrollToTop` | `helpers/ScrollToTop.jsx` | `null` | Escucha `pathname` y hace scroll al tope |

---

## 5. Páginas y su árbol de componentes

Notación: `Componente(prop=valor)` · `← fuente de datos` · `→ contexto que usa`.

### Layout común (`ViajesRoutes`)

```
ViajesRoutes
├── Navbar                          estado local: fixed (scroll) · links + ícono carrito → /compras
├── <Routes> … página …
└── Footer
    ├── Newsletter                  input + botón (no envía nada)
    ├── SectionImg                  ← mock icoImg
    │   └── SectionImgCard × 6      ({id})
    └── links + íconos sociales
```

### `HomePage` (`/home`)

```
HomePage
├── PageHeader(page='home')
│   └── HeroBanner                  ({id, page, title, subtitle}) ← mock viajes
├── RecorridoSection                ← mock destinos.slice(0, 4)
│   └── RecorridoCard × 4           ({id, country, name, price})
├── AdSection                       ← mock ads
│   └── ImageSlider(ads)            estado local: currentIndex, avanza cada 5 s
├── DestinoSection                  ← mock destinos.slice(4, 11)
│   └── DestinoCard × 7             ({id, country, city, price})
├── OfertaSection                   ← mock ad_verano
│   └── OfertaCard × N              ({id, title, description, off})
└── NosotrosSection                 ← mock nosotros
    └── NosotrosCard × 4            ({id, title, description})
```

### `AboutPage` (`/about`)

```
AboutPage
├── PageHeader(page='about') → HeroBanner
└── AboutSection                    texto fijo (lorem ipsum)
```

### `ServicePage` (`/servicios`)

```
ServicePage
├── PageHeader(page='servicios') → HeroBanner
├── ServicesTours                   ← mock destinos.slice(13, 19)
│   └── ToursCards × 6              ({id, name, alt, price, discount, bank, rating, guide})
├── ServicesDiscount                ← mock ad_verano
│   └── OfertaCard × N              (reutilizado de OfertaSection)
└── ServicesBanks                   ← mock creditCard, debitCard, banks (sin props)
```

### `ViajesPage` (`/viajes`)

```
ViajesPage
├── PageHeader(page='viajes') → HeroBanner
├── ViajesSection(numCardsToShow=8) ← API /api/destino   → useFilters (sin filtrar: page 'default')
│   └── ViajesCard × 8              → CartContext.addToCart
├── Button "Ver más" → /viajes/destinos
├── ViajesAdSection                 ← mock ad_viajes
│   └── ImageSlider(ads)
├── HotelSection(numCardstoShow=8)  ← API /api/hotel
│   └── ViajesCard × 8              (reutilizado para hoteles)
└── Button "Ver más" → /viajes/hoteles
```

### `DestinosPage` (`/viajes/destinos`) y `HotelesPage` (`/viajes/hoteles`)

```
DestinosPage                        al montar: setCurrentPage('DestinosPage')
├── PageHeader(page='viajes') → HeroBanner
├── DestinoFilters                  → useFilters (activeFilters, updateFilters)
└── ViajesSection(numCardsToShow=34)
    └── ViajesCard × ≤34

HotelesPage                         al montar: setCurrentPage('HotelesPage')
├── PageHeader(page='viajes') → HeroBanner
├── DestinoFilters                  (mismo componente, filtros guardados aparte)
└── HotelSection(numCardstoShow=24)
    └── ViajesCard × ≤24
```

### `Cart` (`/compras`)

```
Cart                                → CartContext (cartItems, clearCart, getTotalCartAmount)
├── PageHeader(page='cart') → HeroBanner
├── CartItem × (destinos del mock con cantidad ≠ 0)
│     ({id, url, alt, name, country, description, price})
│     → CartContext (cartItems, addToCart, removeFromCart)
└── "Seguir comprando" → /viajes/destinos · "Terminar compra" → clearCart()
```

### `ContactPage` (`/contacto`)

```
ContactPage
├── NavbarContact
├── ContactForm                     react-hook-form: name, lastname, email, number, message
│     onSubmit → navigate('/reedirecion')  (no envía datos a ningún lado)
└── FooterContact
```

---

## 6. Referencia de props por componente

**Recibe** = props de entrada. **Envía** = qué dispara hacia afuera (en este proyecto no hay callbacks por props: toda la comunicación hacia arriba pasa por Context o por navegación).

| Componente | Recibe (props) | Envía / efectos | Usado en |
|---|---|---|---|
| `PageHeader` | `page: string` | — | Todas las páginas de viajes, `Cart` |
| `HeroBanner` | `id, page, title, subtitle` (spread de `viajes`) | — | `PageHeader` |
| `RecorridoCard` | `id, country, name, price` | — | `RecorridoSection` |
| `DestinoCard` | `id, country, city, price` | — | `DestinoSection` |
| `OfertaCard` | `id, title, description, off` | — | `OfertaSection`, `ServicesDiscount` |
| `NosotrosCard` | `id, title, description` | — | `NosotrosSection` |
| `ImageSlider` | `ads: Array<{id, title, subtitle, description}>` | — | `AdSection`, `ViajesAdSection` |
| `ViajesSection` | `numCardsToShow: number` | — | `ViajesPage`, `DestinosPage` |
| `HotelSection` | `numCardstoShow: number` *(con "t" minúscula)* | — | `ViajesPage`, `HotelesPage` |
| `ViajesCard` | `id/Id, url/Url, imageId/ImageId, name/Name, description/Description, price/Price` (acepta mock o API) | `addToCart(id)` vía `CartContext` | `ViajesSection`, `HotelSection` |
| `DestinoFilters` | — | `updateFilters({minPrice})`, `updateFilters({continent})` vía `useFilters` | `DestinosPage`, `HotelesPage` |
| `ToursCards` | `id, name, alt, price, discount, bank, rating, guide` | — | `ServicesTours` |
| `CartItem` | `id, url, alt, name, country, description, price` | `addToCart(id)`, `removeFromCart(id)` vía `CartContext` | `Cart` |
| `SectionImgCard` | `id` | — | `SectionImg` |
| Resto (`Navbar`, `Footer`, `Newsletter`, `SectionImg`, `AboutSection`, `AdSection`, `ViajesAdSection`, `OfertaSection`, `NosotrosSection`, `RecorridoSection`, `DestinoSection`, `ServicesTours`, `ServicesDiscount`, `ServicesBanks`, `ContactForm`, `ContactFormRedic`, `NavbarContact`, `FooterContact`) | ninguna | Navegación (`Link`, `useNavigate`) | — |

---

## 7. Datos mock (`src/data/`)

| Export | Archivo | Forma | Usado por |
|---|---|---|---|
| `destinos` | `destinos.js` | `{id:'countryN', url, country, continent, name, alt, description, price:'400' (string), discount, bank, rating?, guide?}` | `CartContext`, `Cart`, `RecorridoSection`, `DestinoSection`, `ServicesTours` |
| `hoteles` | `hoteles.js` | `{id, url:'hoteles', country, continent, name, alt, description, price}` | Importado en `HotelSection` pero ya no se usa (lo pisa el hook) |
| `viajes` | `viajes.js` | `{id, page, title, subtitle}` (imagen y textos del hero) | `getPageByName` |
| `ads`, `ad_viajes`, `ad_verano` | `ads.js` | `{id, title, subtitle?, description, off?}` | Sliders y ofertas |
| `creditCard`, `debitCard`, `banks` | `banks.js` | `{id, name, discount, img}` | `ServicesBanks` |
| `nosotros` | `nosotros.js` | `{id, title, description}` | `NosotrosSection` |
| `icoImg` | `ico.js` | `{id}` | `SectionImg` |
| `adVerano` | `verano.js` | — | **No se exporta en `index.js`; archivo sin uso** |

Imágenes: todas en `Frontend/public/` y se arman como `/{carpeta}/{id}.jpg` (`countries/`, `hoteles/`, `ads/`, `backgrounds/`, `ico/`).

### Diferencia de forma entre mock y API

| Campo | Mock | API (JSON camelCase) |
|---|---|---|
| id | `'country1'` / `'mirador_del_lago'` | Guid (`'3f2a…'`) |
| imagen | se usa `id` | se usa `imageId` |
| price | string (`'400'`) | number (`400`) |

`ViajesCard` ya contempla las dos formas; el resto de los componentes solo entiende la forma del mock.
