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
  <div className="px-4 sm:px-6">
    <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Categorías</h2>
      <button
        className="bg-green-600 text-white text-sm sm:text-base px-3 sm:px-4 py-2 rounded hover:bg-green-700 transition"
        onClick={handleAbrirModal}
      >
        + Agregar
      </button>
    </div>

    {loading ? (
      <p className="text-gray-600">Cargando...</p>
    ) : categorias.length === 0 ? (
      <p className="text-gray-500">No hay categorías registradas.</p>
    ) : (
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">Nombre</th>
              <th scope="col" className="px-6 py-3 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {categorias.map((categoria) => (
              <tr
                key={categoria.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-white">
                  {categoria.nombre}
                </td>
                <td className="px-6 py-4 text-right space-x-2">
                  <button
                    onClick={() => handleEditarCategoria(categoria)}
                    className="text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleEliminarCategoria(categoria.id)}
                    className="text-red-600 dark:text-red-500 hover:underline"
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
        <div className="flex flex-col sm:flex-row justify-end gap-2">
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
