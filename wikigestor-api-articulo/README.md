# 🛡️ Microservicio de Artículos - WikiGestor

Este microservicio es responsable de la gestión completa (CRUD) de artículos en WikiGestor.

---

## 🚀 Tecnologías utilizadas

- Node.js + Express.js  
- Sequelize ORM  
- SQL Server  
- Swagger  
- Docker  

---

## 🌐 Endpoints disponibles

- `GET /api/articulos` — Listar todos los artículos  
- `POST /api/articulos` — Crear un nuevo artículo  
- `GET /api/articulos/:id` — Artículo por ID  
- `PUT /api/articulos/:id` — Actualizar artículo por ID  
- `DELETE /api/articulos/:id` — Eliminar artículo por ID  

---

## 🛠️ Instalación local (opcional)

Clona el repositorio raíz (monorepo):  
`git clone https://github.com/julianmerinodev/wikigestor-app.git`

Ingresa al proyecto de artículos  
```bash
cd wikigestor-app
cd wikigestor-api-articulo

Instala las dependencias:
npm install

Ejecuta el servicio:
npm start
---
## ⚙️ Variables de entorno

Crea un archivo `.env` dentro del directorio `wikigestor-api-articulo` con el siguiente contenido:
```env
# Base de datos
DB_HOST=host                # Dirección del host (por ejemplo: localhost o nombre de servicio Docker)
DB_NAME=name_db             # Nombre de la base de datos
DB_USER=user_db             # Usuario de base de datos
DB_PASS=password            # Contraseña del usuario
DB_DIALECT=mssql            # Dialecto (mssql para SQL Server)
DB_PORT=1433                # Puerto SQL Server (por defecto 1433)

# Servidor
PORT=5200                   # Puerto del servicio

# JWT
JWT_SECRET=SECRET           # Clave secreta para firmar tokens
JWT_EXPIRE=7d               # Duración del token (por ejemplo: 1d, 7d, 30m)
```

---
## 📄 Documentación Swagger
Aquí puedes revisar la documentación acerca de los endpoints disponibles con la interfaz de swagger

http://localhost:5200/docs/
