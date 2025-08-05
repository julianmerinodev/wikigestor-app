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
        + Agregar artículo
      </button>
    </div>

    {loading ? (
      <p className="text-gray-600">Cargando...</p>
    ) : articulos.length === 0 ? (
      <p className="text-gray-500">No hay artículos registrados.</p>
    ) : (
      <div className="overflow-x-auto">
        <table className="w-full text-left table-auto min-w-[600px]">
          <thead className="bg-gray-100 text-gray-700 text-sm sm:text-base">
            <tr>
              <th className="p-3 sm:p-4 border-b">Título</th>
              <th className="p-3 sm:p-4 border-b">Contenido</th>
              <th className="p-3 sm:p-4 border-b">Categoría</th>
              <th className="p-3 sm:p-4 border-b">Acciones</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm sm:text-base">
            {articulos.map((articulo) => (
              <tr key={articulo.id} className="border-t hover:bg-gray-50 transition">
                <td className="p-3 sm:p-4">{articulo.titulo}</td>
                <td className="p-3 sm:p-4">{articulo.contenido}</td>
                <td className="p-3 sm:p-4">{articulo.categoria.nombre}</td>
                <td className="p-3 sm:p-4 space-x-2">
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
                    onClick={() => handleEditar(articulo)}
                  >
                    Editar
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                    onClick={() => handleEliminar(articulo.id)}
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
