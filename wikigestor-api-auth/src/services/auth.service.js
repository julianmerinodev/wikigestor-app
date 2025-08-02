// src/services/auth.service.js
const bcrypt = require('bcrypt');
const Usuario = require('../models/usuario.model');

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
}

module.exports = AuthService;
