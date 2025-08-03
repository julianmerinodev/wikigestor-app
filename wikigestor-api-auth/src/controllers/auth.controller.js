// src/controllers/auth.controller.js
const AuthService = require('../services/auth.service');
const apiResponse = require('../utils/response');

class AuthController {

  //Enpoint para nuevo usuario
  static async registrar(req, res) {
    try {
    //   console.log("Entro al controller")
      const usuario = await AuthService.registrarUsuario(req.body);
      const { contrasena, ...usuarioData } = usuario.toJSON();
      res.status(201).json(apiResponse({
      success: true,
      message: 'Usuario logueado correctamente',
      statusCode: 201,
    }));
      
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
   
  //login
  static async login(req, res) {
    try {
      const token = await AuthService.loginUsuario(req.body);
      res.status(200).json(apiResponse({
      success: true,
      message: 'Usuario logueado correctamente',
      statusCode: 200,
      data: {
        token: token.token,
        usuario: token.usuario
      }
    }));

    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  }
}

module.exports = AuthController;
