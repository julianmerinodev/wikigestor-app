// src/app.js
const express = require('express');
const app = express();
const authRoutes = require('./routes/auth.routes');
const setupSwagger = require('./docs/swagger');
const cors = require('cors');

app.use(express.json());

// Configuración  CORS
app.use(cors({
  origin: 'http://localhost:5173', //server del app de frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use('/api/auth', authRoutes);

// Swagger docs
setupSwagger(app);


module.exports = app;
