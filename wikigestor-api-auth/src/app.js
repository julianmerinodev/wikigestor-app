const express = require('express');

const app = express();

app.use(express.json());

// prueba
app.get('/', (req, res) => {
  res.send('Hola!');
});

module.exports = app;
