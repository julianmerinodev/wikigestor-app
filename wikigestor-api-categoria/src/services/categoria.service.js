const Categoria = require('../models/categoria.model');

class CategoriaService {
  // Crear nueva categoría
  static async crearCategoria(data) {
    const { nombre } = data;

    // Validar si ya existe una categoría con ese nombre
    const existe = await Categoria.findOne({ where: { nombre } });
    if (existe) throw new Error('La categoría ya existe');

    const categoria = await Categoria.create({
      nombre,
      fechaCreacion: new Date(),
      fechaActualizacion: new Date(),
    });
    return categoria;
  }

  // Obtener todas las categorías
  static async obtenerCategorias() {
    return await Categoria.findAll();
  }

  // Obtener categoría por id
  static async obtenerCategoriaPorId(id) {
    const categoria = await Categoria.findByPk(id);
    if (!categoria) throw new Error('Categoría no encontrada');
    return categoria;
  }

  // Actualizar categoría
  static async actualizarCategoria(id, data) {
    const categoria = await Categoria.findByPk(id);
    if (!categoria) throw new Error('Categoría no encontrada');

    if (data.nombre) {
      // Verificar si el nuevo nombre ya está en uso por otra categoría
      const existe = await Categoria.findOne({ where: { nombre: data.nombre } });
      if (existe && existe.id !== id) throw new Error('El nombre ya está en uso');
    }

    categoria.nombre = data.nombre || categoria.nombre;
    categoria.fechaActualizacion = new Date();

    await categoria.save();
    return categoria;
  }

  // Eliminar categoría
  static async eliminarCategoria(id) {
    const categoria = await Categoria.findByPk(id);
    if (!categoria) throw new Error('Categoría no encontrada');

    await categoria.destroy();
    return;
  }
}

module.exports = CategoriaService;
