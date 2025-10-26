import React from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpenIcon,
  ChartBarIcon,
  BeakerIcon,
  DocumentTextIcon,
  CpuChipIcon,
  PlusIcon
} from '@heroicons/react/24/outline';

const Dashboard: React.FC = () => {
  const quickActions = [
    {
      title: 'Neues Rezept',
      description: 'Erstelle ein neues Bierrezept',
      icon: BookOpenIcon,
      href: '/recipes',
      color: 'bg-blue-500'
    },
    {
      title: 'Maische-Kurve',
      description: 'Plane deine Maische-Temperatur',
      icon: ChartBarIcon,
      href: '/mash-curves',
      color: 'bg-green-500'
    },
    {
      title: 'Gärkurve',
      description: 'Überwache die Gärung',
      icon: BeakerIcon,
      href: '/fermentation-curves',
      color: 'bg-purple-500'
    },
    {
      title: 'Brautagebuch',
      description: 'Dokumentiere dein Brauen',
      icon: DocumentTextIcon,
      href: '/brewing-journal',
      color: 'bg-orange-500'
    }
  ];

  const recentActivities = [
    { action: 'Rezept erstellt', item: 'IPA Classic', time: 'vor 2 Stunden' },
    { action: 'Maische-Kurve gespeichert', item: 'Helles Bier', time: 'vor 1 Tag' },
    { action: 'Gärung gestartet', item: 'Stout', time: 'vor 3 Tagen' }
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Willkommen bei BrauComputer</h1>
        <p className="text-gray-600">Deine moderne Brausoftware für professionelles Bierbrauen</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Schnellzugriff</h2>
          <div className="grid grid-cols-2 gap-4">
            {quickActions.map((action, index) => (
              <Link
                key={index}
                to={action.href}
                className="group p-4 rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200"
              >
                <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                  <action.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-medium text-gray-900 mb-1">{action.title}</h3>
                <p className="text-sm text-gray-600">{action.description}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Letzte Aktivitäten</h2>
          <div className="space-y-3">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                <div>
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  <p className="text-sm text-gray-600">{activity.item}</p>
                </div>
                <span className="text-xs text-gray-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <BookOpenIcon className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Rezepte</p>
              <p className="text-2xl font-bold text-gray-900">12</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <ChartBarIcon className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Maische-Kurven</p>
              <p className="text-2xl font-bold text-gray-900">8</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-lg">
              <BeakerIcon className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Aktive Gärungen</p>
              <p className="text-2xl font-bold text-gray-900">3</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center">
            <div className="p-3 bg-orange-100 rounded-lg">
              <DocumentTextIcon className="w-6 h-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Brautagebuch</p>
              <p className="text-2xl font-bold text-gray-900">15</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
