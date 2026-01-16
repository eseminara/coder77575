# API de Productos y Carritos

API RESTful desarrollada con Node.js y Express para gestionar productos y carritos.

## Características

- Servidor Express en puerto 8080
- Rutas: `/api/products` y `/api/carts`
- CRUD completo para productos
- Creación y gestión de carritos
- Persistencia en archivos JSON
- IDs autogenerados

## Instalación

1. `npm install`
2. `node src/app.js`

## Endpoints

### Productos
- GET /api/products
- GET /api/products/:id
- POST /api/products
- PUT /api/products/:id
- DELETE /api/products/:id

### Carritos
- POST /api/carts
- GET /api/carts/:id
- POST /api/carts/:cid/product/:pid
