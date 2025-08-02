// src/app.js
const express = require('express');
const app = express();
const authRoutes = require('./routes/auth.routes');
const setupSwagger = require('./docs/swagger');

app.use(express.json());

app.use('/api/auth', authRoutes);

// Swagger docs
setupSwagger(app);


module.exports = app;
