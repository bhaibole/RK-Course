import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, PlusSquare, Search, User, BookOpen } from 'lucide-react';

export const Navbar: React.FC = () => {
  const location = useLocation();

  const NavItem = ({ to, icon: Icon, label }: { to: string; icon: any; label: string }) => {
    const isActive = location.pathname === to;
    return (
      <Link to={to} className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${isActive ? 'text-primary' : 'text-slate-400 hover:text-slate-200'}`}>
        <Icon size={24} />
        <span className="text-[10px]">{label}</span>
      </Link>
    );
  };

  return (
    <nav className="fixed bottom-0 left-0 z-50 w-full h-16 bg-slate-900/95 backdrop-blur-md border-t border-slate-800">
      <div className="grid h-full grid-cols-5 max-w-lg mx-auto">
        <NavItem to="/" icon={Home} label="Home" />
        <NavItem to="/templates" icon={Search} label="Explore" />
        <NavItem to="/editor" icon={PlusSquare} label="Create" />
        <NavItem to="/tutorials" icon={BookOpen} label="Learn" />
        <NavItem to="/profile" icon={User} label="Profile" />
      </div>
    </nav>
  );
};