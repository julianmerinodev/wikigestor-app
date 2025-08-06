import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCategorias } from '../../services/CategoriaService/CategoriaService';
import { getArticulos } from '../../services/ArticuloService/ArticuloService';
import { Folder, FileText, ListOrdered, Layers } from 'lucide-react';

export default function Home() {
  const [categorias, setCategorias] = useState([]);
  const [articulos, setArticulos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const cargarResumen = async () => {
      try {
        const [catRes, artRes] = await Promise.all([
          getCategorias(),
          getArticulos(),
        ]);
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
      <h1 className="text-3xl font-bold text-gray-800 mb-2">
        Bienvenido a WikiGestor
      </h1>
      <p className="text-gray-600 mb-6 text-lg">
        Administra tus categorías y artículos fácilmente
      </p>

      {/* Tarjetas de gestión */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div
          onClick={() => navigate('/categorias')}
          className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all border border-gray-100 cursor-pointer flex items-center gap-4"
        >
          <Folder size={40} className="text-indigo-500" />
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              Gestionar Categorías
            </h2>
            <p className="text-gray-500 text-sm">
              Crea, edita o elimina categorías de conocimiento.
            </p>
          </div>
        </div>

        <div
          onClick={() => navigate('/articulos')}
          className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all border border-gray-100 cursor-pointer flex items-center gap-4"
        >
          <FileText size={40} className="text-teal-500" />
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              Gestionar Artículos
            </h2>
            <p className="text-gray-500 text-sm">
              Administra el contenido y los artículos registrados.
            </p>
          </div>
        </div>
      </div>

      {/* Métricas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="bg-green-50 p-5 rounded-xl shadow flex items-center gap-4">
          <ListOrdered size={32} className="text-green-600" />
          <div>
            <p className="text-sm text-green-800">Categorías registradas</p>
            <h3 className="text-2xl font-bold text-green-900">
              {categorias.length}
            </h3>
          </div>
        </div>

        <div className="bg-blue-50 p-5 rounded-xl shadow flex items-center gap-4">
          <Layers size={32} className="text-blue-600" />
          <div>
            <p className="text-sm text-blue-800">Artículos registrados</p>
            <h3 className="text-2xl font-bold text-blue-900">
              {articulos.length}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}
