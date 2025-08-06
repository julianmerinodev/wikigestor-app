# 💻 Frontend - WikiGestor

Este proyecto es el frontend de **WikiGestor**, una aplicación web que permite gestionar artículos y categorías, con autenticación basada en JWT. Construido con React, TypeScript, Tailwind CSS y Vite.

---

## 🚀 Tecnologías utilizadas

- React.js + Vite + TypeScript  
- Tailwind CSS  
- Axios   

---

## 🖼️ Funcionalidades

- Registro y login de usuarios  
- Persistencia de sesión con JWT  
- Visualización, creación, edición y eliminación de **categorías**
- Visualización, creación, edición y eliminación de **artículos**
- Diseño **responsivo**
- Comunicación con microservicios vía HTTP

---

## 🛠️ Instalación local

Clona el repositorio raíz (monorepo):

```bash
git clone https://github.com/julianmerinodev/wikigestor-app.git
cd wikigestor-app
cd wikigestor-web
Instala las dependencias:
npm install

Inicia el servidor de desarrollo:
npm run dev

La aplicación estará disponible en:
http://localhost:5173
```
---
⚙️ Variables de entorno
Crea un archivo .env dentro del directorio frontend con el siguiente contenido:
```env
# Configuración de endpoints
# --------------------------

# Microservicio de autenticación
VITE_API_URL_AUTH=TU_RUTA_DE_MICROSERVICIO_AUTH

# Microservicio de artículos
VITE_API_URL_ARTICULO=TU_RUTA_DE_MICROSERVICIO_ARTICULO

# Microservicio de categorías
VITE_API_URL_CATEGORIA= TU_RUTA_DE_MICROSERVICIO_CATEGORIA
```
---



