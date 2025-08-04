const Articulo = require('../models/articulo.model');
const Categoria = require('../models/categoria.model');
class ArticuloService {

  // Crear un nuevo artículo
  static async crearArticulo(data) {
    // console.log(data)
    const { titulo, contenido, fk_id_categoria } = data;

    // Validar si la categoría existe
    const categoriaExiste = await Categoria.findByPk(fk_id_categoria);
    // console.log(categoriaExiste);
    if (!categoriaExiste) {
      throw new Error('La categoría especificada no existe');
    }

    const nuevoArticulo = await Articulo.create({
      titulo,
      contenido,
      fk_id_categoria
    });
    console.log("Nuevo: " + nuevoArticulo)
    return nuevoArticulo;
  }

  // Obtener todos los artículos con su categoría
  static async obtenerArticulos() {
    return await Articulo.findAll({
      include: {
        model: Categoria,
        as: 'categoria',
        attributes: ['id', 'nombre'],
      },
      order: [['fechaCreacion', 'DESC']],
    });
  }

  // Obtener artículo por ID
  static async obtenerArticuloPorId(id) {
    const articulo = await Articulo.findByPk(id, {
      include: {
        model: Categoria,
        as: 'categoria',
        attributes: ['id', 'nombre'],
      },
    });

    if (!articulo) {
      throw new Error('Artículo no encontrado');
    }

    return articulo;
  }

  // Actualizar artículo
  static async actualizarArticulo(id, data) {
    const articulo = await Articulo.findByPk(id);
    if (!articulo) {
      throw new Error('Artículo no encontrado');
    }

    if (data.fk_id_categoria) {
      const categoriaExiste = await Categoria.findByPk(data.fk_id_categoria);
      if (!categoriaExiste) {
        throw new Error('La categoría especificada no existe');
      }
    }

    await articulo.update({
      ...data,
      fechaActualizacion: new Date(),
    });

    return articulo;
  }

  // Eliminar artículo
  static async eliminarArticulo(id) {
    const articulo = await Articulo.findByPk(id);
    if (!articulo) {
      throw new Error('Artículo no encontrado');
    }

    await articulo.destroy();
  }
}

module.exports = ArticuloService;
