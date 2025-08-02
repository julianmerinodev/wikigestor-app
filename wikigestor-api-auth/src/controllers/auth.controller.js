// src/controllers/auth.controller.js
const AuthService = require('../services/auth.service');

class AuthController {
  static async registrar(req, res) {
    try {
      console.log("Entro al controller")
      const usuario = await AuthService.registrarUsuario(req.body);
      const { contrasena, ...usuarioData } = usuario.toJSON();
      res.status(201).json("Usuario creado correctamente");
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = AuthController;
