# 🛡️ Microservicio de Categorías - WikiGestor

Este microservicio es responsable de la gestión completa (CRUD) de categorías en WikiGestor.
---

## 🚀 Tecnologías utilizadas

- Node.js + Express.js  
- Sequelize ORM  
- SQL Server  
- Swagger 
- Docker  

---

## 🌐 Endpoints disponibles

- `GET /api/categorias` — Listar todas las categorías  
- `POST /api/categorias` — Crear una nueva categoría  
- `GET /api/categorias/:id` — Categoría por ID  
- `PUT /api/categorias/:id` — Actualizar categoría por ID  
- `DELETE /api/categorias/:id` — Eliminar categoría por ID  

---

## 🛠️ Instalación local (opcional)

Clona el repositorio raíz (monorepo):
git clone https://github.com/julianmerinodev/wikigestor-app.git

Ingresa al proyecto de categoría
cd wikigestor-app
cd wikigestor-api-categoria

Instala las dependencias:
npm install

Ejecuta el servicio:
npm start

---
## ⚙️ Variables de entorno

Crea un archivo `.env` dentro del directorio `wikigestor-api-categoria` con el siguiente contenido:
```env
# Base de datos
DB_HOST=host                # Dirección del host (por ejemplo: localhost o nombre de servicio Docker)
DB_NAME=name_db             # Nombre de la base de datos
DB_USER=user_db             # Usuario de base de datos
DB_PASS=password            # Contraseña del usuario
DB_DIALECT=mssql            # Dialecto (mssql para SQL Server)
DB_PORT=1433                # Puerto SQL Server (por defecto 1433)

# Servidor
PORT=5000                   # Puerto del servicio

# JWT
JWT_SECRET=SECRET           # Clave secreta para firmar tokens
JWT_EXPIRE=7d               # Duración del token (por ejemplo: 1d, 7d, 30m)
```

---
## 📄 Documentación Swagger
Aquí puedes revisar la documentación acerca de los endpoints disponibles con la interfaz de swagger

http://localhost:5000/docs/
