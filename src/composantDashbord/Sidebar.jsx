import {
  Home,
  PlusCircle,
  FileText,
  Settings,
  Users,
  CalendarClock,
  LogOut,
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Sidebar() {
  const { pathname } = useLocation();

  const navItems = [
    { to: '/', icon: <Home size={18} />, label: 'Accueil' },
    { to: '/ajouter-publication', icon: <PlusCircle size={18} />, label: 'Nouvelle publication' },
    { to: '/liste-publications', icon: <FileText size={18} />, label: 'Liste publications' },
    { to: '/ajouter-equipe', icon: <Users size={18} />, label: 'Ajouter Équipe' },
    { to: '/liste-equipe', icon: <Users size={18} />, label: 'Équipe' },
    { to: '/reservation', icon: <CalendarClock size={18} />, label: 'Réservation' },
  ];
   const {logout}=useAuth()
  const handleLogout = () => {
    logout()
    // 👉 Add your logout logic here (clear tokens, redirect, etc.)
    console.log("User logged out");
  };

  return (
    <aside className="fixed top-0 left-0 h-full w-64 bg-white shadow-md border-r hidden md:flex flex-col p-6 z-10">
      {/* Logo */}
      <div className="mb-8 flex items-center">
        <img
          src="/costas.png"
          alt="Logo Costas"
          className="w-32 h-auto object-contain"
        />
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 text-sm text-gray-700">
        {navItems.map(({ to, icon, label }) => (
          <Link
            key={to}
            to={to}
            className={`flex items-center gap-3 px-3 py-2 rounded-md hover:bg-blue-100 transition-colors ${
              pathname === to ? 'bg-blue-100 text-blue-700 font-medium' : ''
            }`}
          >
            {icon}
            <span>{label}</span>
          </Link>
        ))}
      </nav>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-3 px-3 py-2 mt-4 rounded-md hover:bg-red-100 text-red-600 transition-colors"
      >
        <LogOut size={18} />
        <span>Déconnexion</span>
      </button>
    </aside>
  );
}
