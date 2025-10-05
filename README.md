# NEXUS - Catálogo de Productos  

## 📌 Integrantes  
- Nahuel Gemignani
- Gonzalez Alex
- Robles Francisco
- Ferreyra, Gianluca
- Martin Ezequiel Diaz

---

## Descripción del Proyecto  
**NEXUS** es una aplicación web que consiste en:  

- **Backend (API con Express.js):** Provee endpoints para listar productos y obtener detalles por ID, con un middleware de logging y manejo centralizado de errores.  
- **Frontend (con React):** Interfaz de usuario que consume la API del backend para mostrar un catálogo de productos, detalle de cada uno, carrito de compras y un formulario de contacto controlado.  

Este proyecto corresponde a las consignas finales de **Sprint 3 y 4**.  

---

## 📂 Estructura del Repositorio  
```
/backend   -> Servidor con Express.js
/client    -> Aplicación frontend con React
```

---

## Requisitos  

### Backend (Express.js)  
- Servidor en Express.  
- Fuente de datos en archivo local `.js` (array de objetos).  
- Endpoints:  
  - `GET /api/productos` → Devuelve todos los productos.  
  - `GET /api/productos/:id` → Devuelve un producto por su ID o 404 si no existe.  
- Middleware:  
  - `express.json()` para procesar JSON.  
  - Middleware global de logging (método + URL).  
- Rutas organizadas con `express.Router`.  
- Manejo de errores centralizado y rutas no encontradas (404).  

### Frontend (React)  
- Arquitectura de componentes reutilizables (`Navbar`, `Footer`, `ProductCard`, `ProductList`, `ProductDetail`, `ContactForm`, etc.).  
- Página de catálogo con estados `Cargando...` y `Error`.  
- Renderizado dinámico de productos con `.map()`.  
- Vista de detalle de producto con renderizado condicional.  
- Carrito de compras manejado desde `App.js`.  
- Formulario de contacto controlado con `useState`.  

---

## Instalación y Uso  

Clonar este repositorio:  
```bash
git clone <URL_DEL_REPOSITORIO>
cd <NOMBRE_DEL_REPO>
```

### Backend  
```bash
cd backend
npm install
npm install nodemailer dotenv
nodemon server.js
```
El servidor se levantará en:  
```
http://localhost:5000
```

### Frontend  
```bash
cd client
npm install
npm run dev
```
La aplicación React se levantará en:  
```
http://localhost:5173
```

---

## Arquitectura y Decisiones  

- Se utilizó **Express.js** sin base de datos, con un archivo local.  
- Las rutas del backend se modularizaron usando `express.Router` para mantener el código limpio y escalable.  
- Se agregó un **middleware global de logging** para seguimiento de peticiones.  
- En el frontend, se optó por **React**, descomponiendo la interfaz en componentes reutilizables para mayor mantenibilidad.  
- El detalle de producto se implementó con renderizado condicional (sin React Router, según consigna).
- El carrito se maneja como estado global en `App.js`, propagando la información mediante props a `Navbar` y `ProductDetail`.  
- El formulario de contacto es **controlado** para asegurar la consistencia de datos.  

---

## Entregables  
- Carpeta `/backend` con API en Express.js.  
- Carpeta `/frontend` con aplicación en React.  
- Historial de commits reflejando la participación de todos los integrantes.  
- Archivo `README.md` con documentación completa del proyecto.  
