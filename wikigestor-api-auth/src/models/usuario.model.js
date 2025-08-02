// src/models/usuario.model.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Usuario = sequelize.define('Usuario', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  apellidoPaterno: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  apellidoMaterno: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  correo: {
    type: DataTypes.STRING(150),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  contrasena: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  fechaCreacion: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  fechaActualizacion: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'Usuarios',
  timestamps: false, // Controlar fechas manualmente
  hooks: {
    beforeUpdate: (usuario) => {
      usuario.fechaActualizacion = new Date();
    }
  }
});

module.exports = Usuario;
