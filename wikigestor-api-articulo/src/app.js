const express = require('express');
const articuloRoutes = require('./routes/articulo.routes');
const setupSwagger = require('./docs/swagger');
const verificarToken = require('./middlewares/verificarToken');
const cors = require('cors');

const app = express();

app.use(express.json());

//Swagger
setupSwagger(app);

// Configuración básica de CORS
app.use(cors({
  origin: 'http://localhost:5173', //server del app de frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
//Middleware para verificar token
app.use(verificarToken);

//Rutas de endpoints
app.use('/api/articulos', articuloRoutes);

module.exports = app;