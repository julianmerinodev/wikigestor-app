// src/services/auth.service.js
require('dotenv').config();
const bcrypt = require('bcrypt');
const Usuario = require('../models/usuario.model');
const jwt = require('jsonwebtoken');

class AuthService {
  static async registrarUsuario(data) {
    console.log("Entro al authService con datos:", data);
    const { nombre, apellidoPaterno, apellidoMaterno, correo, contrasena } = data;

    const existe = await Usuario.findOne({ where: { correo } });
    if (existe) throw new Error('El correo ya está registrado');
    const hashContrasena = await bcrypt.hash(contrasena, 10);

    const usuario = await Usuario.create({
      nombre,
      apellidoPaterno,
      apellidoMaterno,
      correo,
      contrasena: hashContrasena,
      fechaCreacion: new Date(),
      fechaActualizacion: new Date(),
    });
    return usuario;
  }

  static async loginUsuario({ correo, contrasena }) {
    const usuario = await Usuario.findOne({ where: { correo } });
    if (!usuario) throw new Error('Correo o contraseña incorrectos');

    const match = await bcrypt.compare(contrasena, usuario.contrasena);
    if (!match) throw new Error('Correo o contraseña incorrectos');

    const payload = {
      id: usuario.id,
      correo: usuario.correo,
      nombre: usuario.nombre,
    };

    const token = this.generarToken(payload);

    const { contrasena: _, ...usuarioResponse } = usuario.toJSON();

    return {
        token,
        usuario: usuarioResponse
    };
  }

  //Generacion de token jwt
  static generarToken(payload) {
    return jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });
  }
}



module.exports = AuthService;
