import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className={`flex-1 ${!isHome ? 'pt-16 md:pt-20' : ''}`}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
