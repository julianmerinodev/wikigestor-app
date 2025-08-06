// src/app.js
const express = require('express');
const app = express();
const authRoutes = require('./routes/auth.routes');
const setupSwagger = require('./docs/swagger');
const cors = require('cors');
const SERVER = process.env.SERVER;
const PORT = process.env.PORT;

app.use(express.json());


app.get('/health',(req,res) => {
    res.status(200).send('Ok');
})
// Configuración  CORS
app.use(cors({
 origin:  '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use('/api/auth', authRoutes);

// Swagger docs
setupSwagger(app);


module.exports = app;
