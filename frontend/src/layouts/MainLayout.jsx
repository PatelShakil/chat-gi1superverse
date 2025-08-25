import React from 'react';
import Header from '../components/Header';

const MainLayout = ({ children }) => {
  return (
    <div className="flex h-screen w-screen bg-gray-100">
      <div className="flex flex-col flex-1">
        {/* Sticky Header */}
        <Header />
        
        {/* Main Workspace */}
        <main className="flex-1 overflow-hidden">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
