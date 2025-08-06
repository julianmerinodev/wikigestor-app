import { useEffect, useState } from 'react';
import {
  getArticulos,
  createArticulo,
  updateArticulo,
  deleteArticulo
} from '../../services/ArticuloService/ArticuloService';
import { getCategorias } from '../../services/CategoriaService/CategoriaService';
import Modal from '../../components/Modal/Modal';
import toast from 'react-hot-toast';

interface Articulo {
  id: string;
  titulo: string;
  contenido: string;
  categoria: {
    id: string;
    nombre: string;
  };
}

interface Categoria {
  id: string;
  nombre: string;
}

export default function Articulos() {
  const [articulos, setArticulos] = useState<Articulo[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [articuloSeleccionado, setArticuloSeleccionado] = useState<Articulo | null>(null);
  const [titulo, setTitulo] = useState('');
  const [contenido, setContenido] = useState('');
  const [categoriaId, setCategoriaId] = useState('');

  useEffect(() => {
    cargarArticulos();
    cargarCategorias();
  }, []);

  const cargarArticulos = async () => {
    try {
      const res = await getArticulos();
      setArticulos(res.data.data);
    } catch (error) {
      console.error('Error al cargar artículos', error);
    } finally {
      setLoading(false);
    }
  };

  const cargarCategorias = async () => {
    try {
      const res = await getCategorias();
      setCategorias(res.data.data);
    } catch (error) {
      console.error('Error al cargar categorías', error);
    }
  };

  const handleGuardar = async () => {
    if (!titulo.trim() || !contenido.trim() || !categoriaId) return;

    try {
      if (modoEdicion && articuloSeleccionado) {
        const res = await updateArticulo(articuloSeleccionado.id, {
          titulo,
          contenido,
          categoriaId
        });
        toast.success(res.data.message);
      } else {
        const res = await createArticulo({ titulo, contenido, fk_id_categoria: categoriaId });
        toast.success(res.data.message);
      }

      await cargarArticulos();
      cerrarModal();
    } catch (error) {
      console.error('Error al guardar artículo', error);
      toast.error('Ocurrió un error al guardar el artículo');
    }
  };

  const handleEliminar = async (id: string) => {
    try {
      const res = await deleteArticulo(id);
      toast.success(res.data.message);
      await cargarArticulos();
    } catch (error) {
      console.error('Error al eliminar artículo', error);
      toast.error('Error al eliminar artículo');
    }
  };

  const handleEditar = (articulo: Articulo) => {
    setModoEdicion(true);
    setArticuloSeleccionado(articulo);
    setTitulo(articulo.titulo);
    setContenido(articulo.contenido);
    setCategoriaId(articulo.categoria.id);
    setModalOpen(true);
  };

  const handleAbrirModal = () => {
    setModoEdicion(false);
    setArticuloSeleccionado(null);
    setTitulo('');
    setContenido('');
    setCategoriaId('');
    setModalOpen(true);
  };

  const cerrarModal = () => {
    setModalOpen(false);
    setTitulo('');
    setContenido('');
    setCategoriaId('');
    setModoEdicion(false);
    setArticuloSeleccionado(null);
  };

return (
  <div className="px-4 sm:px-6">
    <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Artículos</h2>
      <button
        className="bg-green-600 text-white text-sm sm:text-base px-3 sm:px-4 py-2 rounded hover:bg-green-700 transition"
        onClick={handleAbrirModal}
      >
        + Agregar
      </button>
    </div>

    {loading ? (
      <p className="text-gray-600">Cargando...</p>
    ) : articulos.length === 0 ? (
      <p className="text-gray-500">No hay artículos registrados.</p>
    ) : (
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
       <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" className="px-6 py-3">Título</th>
          <th scope="col" className="px-6 py-3">Contenido</th>
          <th scope="col" className="px-6 py-3">Categoría</th>
          <th scope="col" className="px-6 py-3 text-right">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {articulos.map((articulo) => (
          <tr
            key={articulo.id}
            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
          >
            <th
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              {articulo.titulo}
            </th>
            <td className="px-6 py-4">{articulo.contenido}</td>
            <td className="px-6 py-4">{articulo.categoria.nombre}</td>
            <td className="px-6 py-4 text-right space-x-2">
              <button
                onClick={() => handleEditar(articulo)}
                className="text-blue-600 dark:text-blue-500 hover:underline"
              >
                Editar
              </button>
              <button
                onClick={() => handleEliminar(articulo.id)}
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
      title={modoEdicion ? 'Editar Artículo' : 'Agregar Artículo'}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleGuardar();
        }}
      >
        <input
          type="text"
          placeholder="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          className="w-full border px-4 py-2 rounded mb-4"
        />
        <textarea
          placeholder="Contenido"
          value={contenido}
          onChange={(e) => setContenido(e.target.value)}
          className="w-full border px-4 py-2 rounded mb-4"
          rows={4}
        />
        <select
          value={categoriaId}
          onChange={(e) => setCategoriaId(e.target.value)}
          className="w-full border px-4 py-2 rounded mb-4"
        >
          <option value="">Selecciona una categoría</option>
          {categorias.map((c) => (
            <option key={c.id} value={c.id}>
              {c.nombre}
            </option>
          ))}
        </select>
        <div className="flex flex-col sm:flex-row justify-end gap-2">
          <button
            type="button"
            onClick={cerrarModal}
            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
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
