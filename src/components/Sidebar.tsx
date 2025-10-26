import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  HomeIcon,
  BookOpenIcon,
  ChartBarIcon,
  BeakerIcon,
  DocumentTextIcon,
  CpuChipIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle }) => {
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/', icon: HomeIcon },
    { name: 'Rezepte', href: '/recipes', icon: BookOpenIcon },
    { name: 'Maische-Kurven', href: '/mash-curves', icon: ChartBarIcon },
    { name: 'Gärkurven', href: '/fermentation-curves', icon: BeakerIcon },
    { name: 'Malz-Datenbank', href: '/malt-database', icon: DocumentTextIcon },
    { name: 'Brautagebuch', href: '/brewing-journal', icon: DocumentTextIcon },
    { name: 'Brewbrain Float', href: '/brewbrain', icon: CpuChipIcon },
  ];

  return (
    <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 text-white transition-transform duration-300 ease-in-out ${
      isOpen ? 'translate-x-0' : '-translate-x-48'
    }`}>
      <div className="flex items-center justify-between h-16 px-4 border-b border-gray-700">
        <h1 className="text-xl font-bold text-brew-gold">BrauComputer</h1>
        <button
          onClick={onToggle}
          className="p-2 rounded-lg hover:bg-gray-700 transition-colors"
        >
          {isOpen ? (
            <ChevronLeftIcon className="w-5 h-5" />
          ) : (
            <ChevronRightIcon className="w-5 h-5" />
          )}
        </button>
      </div>
      
      <nav className="mt-8">
        <div className="px-4 space-y-2">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                  isActive
                    ? 'bg-brew-gold text-gray-900'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {isOpen && item.name}
              </Link>
            );
          })}
        </div>
      </nav>
      
      <div className="absolute bottom-4 left-4 right-4">
        <div className="bg-gray-800 rounded-lg p-4">
          <p className="text-xs text-gray-400">Version 1.0.0</p>
          <p className="text-xs text-gray-400">BrauComputer</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
