import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL_ARTICULO;

// Header con token
const authHeader = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// Obtener todos los artículos
export const getArticulos = async () => {
  const response = await axios.get(`${API_URL}`, authHeader());
  return response;
};

// Crear un nuevo artículo
export const createArticulo = async (data: {
  titulo: string;
  contenido: string;
  fk_id_categoria: string;
}) => {
    // console.log("Data crear articulo: " + data);
  const response = await axios.post(`${API_URL}`, data, authHeader());
  return response;
};

// Obtener un artículo por ID
export const getArticuloById = async (id: string) => {
  const response = await axios.get(`${API_URL}/${id}`, authHeader());
  return response;
};

// Actualizar un artículo
export const updateArticulo = async (
  id: string,
  data: {
    titulo: string;
    contenido: string;
    categoriaId: string;
  }
) => {
  const response = await axios.put(`${API_URL}/${id}`, data, authHeader());
  return response;
};

// Eliminar un artículo
export const deleteArticulo = async (id: string) => {
  const response = await axios.delete(`${API_URL}/${id}`, authHeader());
  return response;
};
