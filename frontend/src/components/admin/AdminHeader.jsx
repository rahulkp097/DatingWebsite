import React from 'react';
import { Link } from 'react-router-dom';

function AdminHeader() {
  return (
    <header className="bg-gray-800 text-white p-4">
      <nav className="flex justify-center space-x-4">
        <Link to="/adminhome" className="hover:underline">Dashboard</Link>
        <Link to="/admin/users" className="hover:underline">Users</Link>
        <Link to="/admin/subscriptions" className="hover:underline">Subscriptions</Link>
        <Link to="/admin/token" className="hover:underline">Token</Link>
      </nav>
    </header>
  );
}

export default AdminHeader;
