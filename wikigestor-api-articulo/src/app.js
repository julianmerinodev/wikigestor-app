const express = require('express');
const articuloRoutes = require('./routes/articulo.routes');
const setupSwagger = require('./docs/swagger');

const app = express();

app.use(express.json());
app.use('/api/articulos', articuloRoutes);
//Swagger
setupSwagger(app);


module.exports = app;