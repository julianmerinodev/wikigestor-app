const express = require('express');
const categoriaRoutes = require('./routes/categoria.routes');
const setupSwagger = require('./docs/swagger');
const verificarToken = require('./middlewares/verificarToken');


const app = express();

app.use(express.json());

// Documentación Swagger
setupSwagger(app);

//Middleware para verificar token valido
app.use(verificarToken);

// Rutas de los endpoints
app.use('/api/categorias', categoriaRoutes);




module.exports = app;
