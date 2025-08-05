const ArticuloService = require('../services/articulo.service');
const apiResponse = require('../utils/response');
const response = require('../utils/response');
class ArticuloController {

  // Crear un nuevo artículo
  static async crearArticulo(req, res) {
    try {
      const articulo = await ArticuloService.crearArticulo(req.body);
      res.status(201).json(
        response({
          success: true,
          message: "Artículo registrado correctamente",
          statusCode: 201
        })
      );
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  // Obtener todos los artículos
  static async listarArticulos(req, res) {
    try {
      const articulos = await ArticuloService.obtenerArticulos();
      res.status(200).json(
        apiResponse({
          success: true,
          message: "Listado de artículos",
          statusCode: 200,
          data: articulos
        })
      );
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // Obtener un artículo por ID
  static async obtenerArticuloPorId(req, res) {
    try {
      const { id } = req.params;
      const articulo = await ArticuloService.obtenerArticuloPorId(id);
      res.status(200).json(
        apiResponse({
          success: true,
          message: "Artículo obtenido por ID",
          statusCode: 200,
          data: articulo
        })
      );
    } catch (error) {
      res.status(404).json({ success: false, message: error.message });
    }
  }

  // Actualizar un artículo por ID
  static async actualizarArticulo(req, res) {
    try {
      const { id } = req.params;
      const articuloActualizado = await ArticuloService.actualizarArticulo(id, req.body);
      res.status(200).json(
        apiResponse({
        success: true,
        message: 'Artículo actualizado correctamente',
        data: articuloActualizado,
        statusCode: 200
      }));
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  // Eliminar un artículo por ID
  static async eliminarArticulo(req, res) {
    try {
      const { id } = req.params;
      await ArticuloService.eliminarArticulo(id);
      res.status(200).json(
        apiResponse(
        { success: true,
          message: 'Artículo eliminado correctamente',
          statusCode: 200,
        }));
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }
}

module.exports = ArticuloController;
