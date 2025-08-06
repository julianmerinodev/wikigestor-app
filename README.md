# 📚 WikiGestor - Plataforma de Gestión de Artículos y Categorías

**WikiGestor** es una aplicación web construida con arquitectura de microservicios, diseñada para gestionar artículos y categorías de forma segura y eficiente. Incluye autenticación basada en JWT, un frontend moderno y microservicios independientes para cada dominio funcional.

---

## 🧱 Arquitectura General

WikiGestor está compuesto por los siguientes proyectos:

| Proyecto                   | Descripción                                    | Tecnología Principal             |
|----------------------------|------------------------------------------------|----------------------------------|
| `wikigestor-api-auth`      | Microservicio de autenticación de usuarios     | Node.js, Express, JWT, Sequelize |
| `wikigestor-api-articulo`  | Microservicio para gestión de artículos        | Node.js, Express, Sequelize      |
| `wikigestor-api-categoria` | Microservicio para gestión de categorías       | Node.js, Express, Sequelize      |
| `wikigestor-web`           | Aplicación web (SPA) con React + Vite          | React, TypeScript, Tailwind CSS  |

---

## 🚀 Requisitos previos

- Node.js v18+
- npm
- Docker (opcional)
- SQL Server (local o en la nube)

---
## 🛠️ Instalación general

Clona el repositorio:

```bash
git clone https://github.com/julianmerinodev/wikigestor-app.git
cd wikigestor-app

🔧 Configura las variables de entorno
Cada microservicio tiene su propio archivo .env. Consulta los README.md de cada uno para más detalles:

wikigestor-api-auth/.env
wikigestor-api-articulo/.env
wikigestor-api-categoria/.env
wikigestor-web/.env

```
---
## ▶️ Consulta los README.md de cada proyecto para más detalles de como funciona cada uno.
- wikigestor-api-auth/README.md    
- ikigestor-api-articulo/README.md    
- wikigestor-api-categoria/README.md    
- wikigestor-web/README.md    


## 📄 Documentación Swagger
Cada microservicio expone su documentación Swagger, puedes revisar más a detalle llendo al README.md ahí trae más información 
acerca de cada uno.

🧪 Estado del proyecto
✅ Autenticación con JWT
✅ CRUD de artículos y categorías
✅ Frontend responsivo
✅ Swagger en cada microservicio
✅ Despliegue listo 

🔗 Repositorio
GitHub: https://github.com/julianmerinodev/wikigestor-app
