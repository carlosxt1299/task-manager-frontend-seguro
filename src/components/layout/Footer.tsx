import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-4 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} TaskManager. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
};
