import { useEffect, useState } from 'react';
import {
  getCategorias,
  createCategoria,
  deleteCategoria,
  updateCategoria
} from '../../services/CategoriaService/CategoriaService';
import Modal from '../../components/Modal/Modal';
import toast from 'react-hot-toast';

interface Categoria {
  id: string;
  nombre: string;
}

export default function Categorias() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [nombreCategoria, setNombreCategoria] = useState('');
  const [modoEdicion, setModoEdicion] = useState(false);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<Categoria | null>(null);

  useEffect(() => {
    cargarCategorias();
  }, []);

  const cargarCategorias = async () => {
    try {
      const data = await getCategorias();
      setCategorias(data.data.data);
    } catch (error) {
      console.error('Error al cargar categorías', error);
    } finally {
      setLoading(false);
    }
  };

  // Agregar o Editar categoría
  const handleGuardarCategoria = async () => {
    if (!nombreCategoria.trim()) return;

    try {
      if (modoEdicion && categoriaSeleccionada) {
        const response = await updateCategoria(categoriaSeleccionada.id,{ nombre: nombreCategoria } );
        toast.success(response.data.message);
      } else {
        const response = await createCategoria({ nombre: nombreCategoria });
        toast.success(response.data.message);
      }

      await cargarCategorias();
      cerrarModal();
    } catch (error) {
      console.error('Error al guardar categoría', error);
      toast.error('Ocurrió un error al guardar la categoría');
    }
  };

  // Eliminar categoría
  const handleEliminarCategoria = async (id: string) => {
    try {
      const response = await deleteCategoria(id);
      toast.success(response.data.message);
      await cargarCategorias();
    } catch (error) {
      console.error('Error al eliminar categoría', error);
      toast.error('Error al eliminar la categoría');
    }
  };

  // Abrir modal para agregar
  const handleAbrirModal = () => {
    setModoEdicion(false);
    setCategoriaSeleccionada(null);
    setNombreCategoria('');
    setModalOpen(true);
  };

  // Abrir modal para editar
  const handleEditarCategoria = (categoria: Categoria) => {
    setModoEdicion(true);
    setCategoriaSeleccionada(categoria);
    setNombreCategoria(categoria.nombre);
    setModalOpen(true);
  };

  // Cerrar y limpiar modal
  const cerrarModal = () => {
    setModalOpen(false);
    setNombreCategoria('');
    setModoEdicion(false);
    setCategoriaSeleccionada(null);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Categorías</h2>
        <button
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
          onClick={handleAbrirModal}
        >
          + Agregar categoría
        </button>
      </div>

      {loading ? (
        <p className="text-gray-600">Cargando...</p>
      ) : categorias.length === 0 ? (
        <p className="text-gray-500">No hay categorías registradas.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left table-auto min-w-max">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="p-4 border-b border-slate-200 bg-slate-50">Nombre</th>
                <th className="p-4 border-b border-slate-200 bg-slate-50">Acciones</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {categorias.map((categoria) => (
                <tr key={categoria.id} className="border-t hover:bg-gray-50 transition duration-200">
                  <td className="p-4 py-5">{categoria.nombre}</td>
                  <td className="border px-4 py-2 space-x-2">
                    <button
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
                      onClick={() => handleEditarCategoria(categoria)}
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleEliminarCategoria(categoria.id)}
                      className="ml-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={cerrarModal}
        title={modoEdicion ? 'Editar Categoría' : 'Agregar Categoría'}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleGuardarCategoria();
          }}
        >
          <input
            type="text"
            placeholder="Nombre de la categoría"
            value={nombreCategoria}
            onChange={(e) => setNombreCategoria(e.target.value)}
            className="w-full border px-4 py-2 rounded mb-4"
          />
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              onClick={cerrarModal}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Guardar
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
