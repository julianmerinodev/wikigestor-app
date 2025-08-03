const CategoriaService = require('../services/categoria.service');
const apiResponse = require('../utils/response');
class CategoriaController {

  // Crear categoría
  static async crearCategoria(req, res) {
    try {
      const categoria = await CategoriaService.crearCategoria(req.body);
      res.status(201).json(
        apiResponse({
            statusCode: 201,
            message: "Categoría registrada correctamente",
            success: true
        })
      );
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  // Obtener todas las categorías
  static async obtenerCategorias(req, res) {
    try {
      const categorias = await CategoriaService.obtenerCategorias();
      res.status(200).json(
        apiResponse({
            statusCode: 200,
            message: "Lista de categorias",
            data: categorias,
            success: true
        })
      );
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // Obtener categoría por id
  static async obtenerCategoriaPorId(req, res) {
    try {
      const { id } = req.params;
      const categoria = await CategoriaService.obtenerCategoriaPorId(id);
      res.status(200).json(
        apiResponse({
            statusCode: 200,
            message: "Categoría por ID",
            success: true,
            data: categoria
        })
      );
    } catch (error) {
      res.status(404).json({ success: false, message: error.message });
    }
  }

  // Actualizar categoría
  static async actualizarCategoria(req, res) {
    try {
      const { id } = req.params;
      const categoria = await CategoriaService.actualizarCategoria(id, req.body);
      res.status(200).json(
        apiResponse({
            statusCode: 200,
            message: "Categoría actualizada correctamente",
            data: categoria,
            success: true
        })
      );
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  // Eliminar categoría
  static async eliminarCategoria(req, res) {
    try {
      const { id } = req.params;
      await CategoriaService.eliminarCategoria(id);
      res.status(200).json(
        apiResponse({
            statusCode: 200,
            message: "Categoría eliminado correctamente",
            success: true
        })
      );
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }
}

module.exports = CategoriaController;
