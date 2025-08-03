// src/server.js
require('dotenv').config();
const app = require('./app');
const sequelize = require('./config/db');

const PORT = process.env.PORT;

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Conectado a la base de datos');
    
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Error al iniciar la aplicación:', err);
  }
})();
