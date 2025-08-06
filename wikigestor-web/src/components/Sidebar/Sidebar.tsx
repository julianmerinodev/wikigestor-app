import { Link, useLocation } from 'react-router-dom';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

export default function Sidebar({ isOpen, toggleSidebar }: SidebarProps) {
  const location = useLocation();

  const menuItems = [
    { name: 'Inicio', path: '/home' },
    // { name: 'Usuarios', path: '/usuarios' },
    { name: 'Artículos', path: '/articulos' },
    { name: 'Categorías', path: '/categorias' },
  ];

  return (
    <>
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-800 text-white transform transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6 text-2xl font-bold border-b border-gray-700 flex justify-between items-center">
          WikiGestor
          <button onClick={toggleSidebar} className="text-white text-xl">✖</button>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={toggleSidebar}
              className={`block px-4 py-2 rounded hover:bg-gray-700 ${
                location.pathname === item.path ? 'bg-gray-700' : ''
              }`}
            >
              {item.name}
              
            </Link>
          ))}
        </nav>
      </div>
      <aside className="hidden md:flex md:flex-col md:fixed md:inset-y-0 md:left-0 md:w-64 bg-gray-800 text-white">
        <div className="p-6 text-2xl font-bold border-b border-gray-700">WikiGestor</div>
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`block px-4 py-2 rounded hover:bg-gray-700 ${
                location.pathname === item.path ? 'bg-gray-700' : ''
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
}
