import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { User, Settings } from 'lucide-react'; // iconos

interface HeaderProps {
  toggleSidebar: () => void;
}

export default function Header({ toggleSidebar }: HeaderProps) {
  const { logout } = useAuth(); // asumo que tienes user.nombre o user
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className="h-16 bg-white shadow px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30">
      
      {/* Menú hamburguesa solo en móvil */}
      <button
        className="md:hidden text-gray-600 text-2xl"
        onClick={toggleSidebar}
        aria-label="Abrir menú"
      >
        ☰
      </button>

      {/* Título central */}
      <h1 className="text-base sm:text-xl font-semibold text-gray-800 text-center flex-1 md:flex-none md:text-left">
        Panel de Administración
      </h1>

      {/* Usuario + icono configuración */}
      <div className="relative">
        <button
          onClick={toggleMenu}
          className="flex items-center gap-2 text-gray-700 hover:text-gray-900"
        >
          <User size={20} />
          <span className="hidden sm:inline">{'Usuario'}</span>
          <Settings size={20} />
        </button>

        {/* Menú desplegable */}
        {menuOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg py-2 z-50">
            <button
              onClick={logout}
              className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              Cerrar sesión
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
