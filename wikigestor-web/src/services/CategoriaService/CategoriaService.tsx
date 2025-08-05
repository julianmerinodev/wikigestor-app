import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL_CATEGORIA

// Configura el header con el token
const authHeader = () => {
  const token = localStorage.getItem('token');
//   console.log("token en service: " + token)
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// Obtener todas las categorías
export const getCategorias = async () => {
  const response = await axios.get(`${API_URL}`, authHeader());
//   console.log(response);
  return response;
};

// Crear una nueva categoría
export const createCategoria = async (data: { nombre: string }) => {
  const response = await axios.post(`${API_URL}`, data, authHeader());
  return response;
};

// Obtener una categoría por ID
export const getCategoriaById = async (id: string) => {
  const response = await axios.get(`${API_URL}/${id}`, authHeader());
  return response;
};

// Actualizar una categoría
export const updateCategoria = async (id: string, data: { nombre: string }) => {
  const response = await axios.put(`${API_URL}/${id}`, data, authHeader());
  return response;
};

// Eliminar una categoría
export const deleteCategoria = async (id: string) => {
  console.log(id)
  const response = await axios.delete(`${API_URL}/${id}`, authHeader());
  return response;
};
