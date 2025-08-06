import axios from 'axios';

const authUrl = import.meta.env.VITE_API_URL_AUTH;

export const login = async (correo: string, contrasena: string) => {

  const response = await axios.post(`${authUrl}/login`, {
    correo,
    contrasena,
  });
  return response;
};

//Petición al endpoint para registrar usuario
export const registrarUsuario = async(
    usuario:{
    nombre: string,
    apellidoPaterno: string,
    apellidoMaterno: string,
    correo: string,
    contrasena: string
    }) =>{
    const response = await axios.post(`${authUrl}/registrar`,usuario);

  return response;
 }
