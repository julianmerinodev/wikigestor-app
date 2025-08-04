const express = require('express');
const articuloRoutes = require('./routes/articulo.routes');
const setupSwagger = require('./docs/swagger');
const verificarToken = require('./middlewares/verificarToken');

const app = express();

app.use(express.json());

//Swagger
setupSwagger(app);

//Middleware para verificar token
app.use(verificarToken);

//Rutas de endpoints
app.use('/api/articulos', articuloRoutes);

module.exports = app;