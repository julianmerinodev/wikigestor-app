const express = require('express');
// const cors = require('cors');
const categoriaRoutes = require('./routes/categoria.routes');
const setupSwagger = require('./docs/swagger');

const app = express();

// Middlewares
// app.use(cors());
app.use(express.json());

// Rutas de los endpoints
app.use('/api/categorias', categoriaRoutes);

// Documentación Swagger
setupSwagger(app);


module.exports = app;
