import { useAuth } from '../../context/AuthContext';

interface HeaderProps {
  toggleSidebar: () => void;
}

export default function Header({ toggleSidebar }: HeaderProps) {
    const { logout } = useAuth();

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

      <h1 className="text-base sm:text-xl font-semibold text-gray-800">
        Panel de Administración
      </h1>

      <button
        onClick={logout}
        className="bg-red-500 text-white text-sm sm:text-base px-3 sm:px-4 py-1.5 rounded-md hover:bg-red-600 transition-colors"
      >
        Cerrar sesión
      </button>
    </header>
  );
}
