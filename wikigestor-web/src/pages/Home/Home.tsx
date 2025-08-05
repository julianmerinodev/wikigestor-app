import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCategorias } from '../../services/CategoriaService/CategoriaService';
import { getArticulos } from '../../services/ArticuloService/ArticuloService';

export default function Home() {
  const [categorias, setCategorias] = useState([]);
  const [articulos, setArticulos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const cargarResumen = async () => {
      try {
        const [catRes, artRes] = await Promise.all([getCategorias(), getArticulos()]);
        setCategorias(catRes.data.data);
        setArticulos(artRes.data.data);
      } catch (error) {
        console.error('Error al cargar resumen:', error);
      }
    };
    cargarResumen();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Bienvenido a WikiGestor</h1>
      <p className="text-gray-600 mb-6">Gestión de módulos</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div
          className="p-4 bg-white rounded-xl shadow hover:shadow-md transition cursor-pointer"
          onClick={() => navigate('/categorias')}
        >
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Gestionar Categorías</h2>
          <p className="text-gray-500">Crea, edita o elimina categorías.</p>
        </div>

        <div
          className="p-4 bg-white rounded-xl shadow hover:shadow-md transition cursor-pointer"
          onClick={() => navigate('/articulos')}
        >
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Gestionar Artículos</h2>
          <p className="text-gray-500">Agrega o edita artículos.</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-green-100 text-green-800 p-4 rounded-xl shadow">
          <p className="text-sm">Categorías registradas</p>
          <h3 className="text-2xl font-bold">{categorias.length}</h3>
        </div>
        <div className="bg-blue-100 text-blue-800 p-4 rounded-xl shadow">
          <p className="text-sm">Artículos registrados</p>
          <h3 className="text-2xl font-bold">{articulos.length}</h3>
        </div>
      </div>
    </div>
  );
}
