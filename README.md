# NEXUS - Catálogo de Productos

## 📌 Integrantes
- Nahuel Gemignani
- Gonzalez Alex
- Robles Francisco
- Ferreyra, Gianluca
- Martin Ezequiel Diaz

---

## Descripción del Proyecto
**NEXUS** es una aplicación web full stack que consiste en:

- **Backend (API con Express.js):** Provee endpoints para listar, crear, actualizar y eliminar productos, conectándose a una base de datos **MongoDB Atlas**. Implementa logging de peticiones y manejo centralizado de errores.
- **Frontend (React):** Interfaz de usuario que consume la API del backend para:
  - Mostrar un catálogo de productos.
  - Ver el detalle de cada producto en páginas dinámicas (`/productos/:id`).
  - Crear, editar y eliminar productos mediante formularios controlados.
  - Navegar con rutas definidas y navegación programática usando `useNavigate`.
  - Gestionar estados de carga y errores en las peticiones.

Este proyecto corresponde a las consignas finales de **Sprint 5 y 6**, donde se implementa persistencia real de datos y operaciones CRUD completas.

---

## 📂 Estructura del Repositorio
```
/backend   -> Servidor Express.js con API y conexión a MongoDB
/frontend    -> Aplicación frontend en React
```

---

## Requisitos

### Backend (Express.js + MongoDB)
- Servidor en Express conectado a **MongoDB Atlas** mediante Mongoose.
- Variables sensibles (URI de MongoDB) almacenadas en `.env`.
- Endpoints CRUD para productos:
  - `GET /api/productos` → Devuelve todos los productos.
  - `GET /api/productos/:id` → Devuelve un producto.
  - `POST /api/productos` → Crea un nuevo producto.
  - `PUT /api/productos/:id` → Actualiza un producto existente por su `_id`.
  - `DELETE /api/productos/:id` → Elimina un producto.
- Middleware global para logging y manejo de errores.

### Frontend (React)
- Rutas definidas con React Router DOM:
  - `/` → Página de inicio.
  - `/productos` → Catálogo de productos.
  - `/productos/:id` → Detalle de producto (dinámico).
  - `/contacto` → Formulario de contacto.
  - `/admin/crear-producto` → Formulario de creación de productos.
- Consumo de API mediante `fetch` para operaciones CRUD.
- Formularios controlados para crear y editar productos.
- Navegación programática usando `useNavigate` tras acciones del usuario.
- Funcionalidad de eliminación con confirmación (`window.confirm`) y redirección al catálogo.

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
node server.js
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

- **Backend:** Express.js + MongoDB con Mongoose, modularizado con `express.Router`.
- **Frontend:** React con componentes reutilizables (`Navbar`, `Footer`, `ProductList`, `ProductDetail`, `ProductForm`).
- El detalle de producto se implementa con **rutas dinámicas** y `useParams`.
- Creación y edición de productos manejadas con **formularios controlados** y validación básica.
- Navegación programática para mejorar la experiencia del usuario.
- Operaciones CRUD totalmente funcionales y persistentes en MongoDB.
- Manejo de errores y estados de carga en todas las peticiones.

---

## Entregables
- Carpeta `/backend` con API en Express.js y conexión a MongoDB.
- Carpeta `/frontend` con aplicación en React consumiendo la API.
- Historial de commits reflejando la participación de todos los integrantes.
- Archivo `README.md` actualizado con documentación completa y enlaces a los despliegues:
  - Frontend: Vercel / Netlify
  - Backend: Render
