const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Categoria = require('./categoria.model'); 

const Articulo = sequelize.define('Articulo', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  titulo: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  contenido: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  fk_id_categoria: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Categorias',
      key: 'id',
    },
  },
  fechaCreacion: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  fechaActualizacion: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'Articulos',
  timestamps: false, 
});

// Relación con Categoría
Articulo.belongsTo(Categoria, {
  foreignKey: 'fk_id_categoria',
  as: 'categoria',
});

module.exports = Articulo;
