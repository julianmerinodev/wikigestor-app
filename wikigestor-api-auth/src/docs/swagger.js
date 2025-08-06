// src/swagger.js
require('dotenv').config();
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const PORT = process.env.PORT;
// const SERVER = process.env.PORT;
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'WikiGestor Auth API',
      version: '1.0.0',
      description: 'Microservicio de autenticación - WikiGestor',
    },
    // servers: [
    //   {
    //     url: `http://localhost:${PORT}`,
    //   },
    // ],
  },
  apis: ['./src/routes/*.js'], // Lee los comentarios en las rutas
};

const specs = swaggerJsdoc(options);

function setupSwagger(app) {
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));
}

module.exports = setupSwagger;
