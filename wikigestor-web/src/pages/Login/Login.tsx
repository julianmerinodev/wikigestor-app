import { useState, useEffect } from 'react';
import { login as loginService, registrarUsuario as registerService } from '../../services/authService';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';

export default function Login() {
  const [modoRegistro, setModoRegistro] = useState(false);

  // Estados Login
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');

  // Estados Registro
  const [nombre, setNombre] = useState('');
  const [apellidoPaterno, setApellidoPaterno] = useState('');
  const [apellidoMaterno, setApellidoMaterno] = useState('');
  const [correoRegistro, setCorreoRegistro] = useState('');
  const [contrasenaRegistro, setContrasenaRegistro] = useState('');

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { isAuthenticated, login } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const data = await loginService(correo, contrasena);
      const token = data.data?.data?.token;
      login(token);
      toast.success(data.data.message);
    } catch (err: any) {
      setError(err?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await registerService({
        nombre,
        apellidoPaterno,
        apellidoMaterno,
        correo: correoRegistro,
        contrasena: contrasenaRegistro,
      });
      setNombre('');
      setApellidoPaterno('');
      setApellidoMaterno('');
      setCorreoRegistro(''); 
      setContrasenaRegistro('');
      setModoRegistro(false);
      toast.success('Usuario registrado correctamente');
      
    } catch (err: any) {
      setError(err?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <div className="flex justify-center mb-6 gap-4">
          <button
            className={`px-4 py-2 rounded ${!modoRegistro ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            onClick={() => {
              setModoRegistro(false);
              setError('');
            }}
          >
            Iniciar Sesión
          </button>
          <button
            className={`px-4 py-2 rounded ${modoRegistro ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            onClick={() => {
              setModoRegistro(true);
              setError('');
            }}
          >
            Registrarse
          </button>
        </div>

        {error && (
          <div className="bg-red-100 text-red-700 p-2 rounded mb-4 text-sm">{error}</div>
        )}

        {!modoRegistro ? (
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label htmlFor="correo" className="block text-sm font-medium">
                Correo electrónico
              </label>
              <input
                type="email"
                id="correo"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="contrasena" className="block text-sm font-medium">
                Contraseña
              </label>
              <input
                type="password"
                id="contrasena"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200"
            >
              {loading ? 'Ingresando...' : 'Iniciar Sesión'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleRegisterSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Nombre</label>
              <input
                type="text"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Apellido Paterno</label>
              <input
                type="text"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
                value={apellidoPaterno}
                onChange={(e) => setApellidoPaterno(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Apellido Materno</label>
              <input
                type="text"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
                value={apellidoMaterno}
                onChange={(e) => setApellidoMaterno(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Correo electrónico</label>
              <input
                type="email"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
                value={correoRegistro}
                onChange={(e) => setCorreoRegistro(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Contraseña</label>
              <input
                type="password"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
                value={contrasenaRegistro}
                onChange={(e) => setContrasenaRegistro(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200"
            >
              {loading ? 'Registrando...' : 'Registrarse'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
