const express = require('express');
const router = express.Router();
const ArticuloController = require('../controllers/articulo.controller');

/**
 * @swagger
 * tags:
 *   name: Artículos
 */

/**
 * @swagger
 * /api/articulos:
 *   post:
 *     summary: Crear un nuevo artículo
 *     tags: [Artículos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - titulo
 *               - contenido
 *               - fk_id_categoria
 *             properties:
 *               titulo:
 *                 type: string
 *               contenido:
 *                 type: string
 *               fk_id_categoria:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Success
 */
router.post('/', ArticuloController.crearArticulo);

/**
 * @swagger
 * /api/articulos:
 *   get:
 *     summary: Obtener todos los artículos
 *     tags: [Artículos]
 *     responses:
 *       200:
 *         description: Success
 */
router.get('/', ArticuloController.listarArticulos);

/**
 * @swagger
 * /api/articulos/{id}:
 *   get:
 *     summary: Obtener un artículo por ID
 *     tags: [Artículos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Success
 */
router.get('/:id', ArticuloController.obtenerArticuloPorId);

/**
 * @swagger
 * /api/articulos/{id}:
 *   put:
 *     summary: Actualizar un artículo por ID
 *     tags: [Artículos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *               contenido:
 *                 type: string
 *               fk_id_categoria:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Success
 */
router.put('/:id', ArticuloController.actualizarArticulo);

/**
 * @swagger
 * /api/articulos/{id}:
 *   delete:
 *     summary: Eliminar un artículo por ID
 *     tags: [Artículos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Success
 */
router.delete('/:id', ArticuloController.eliminarArticulo);

module.exports = router;
