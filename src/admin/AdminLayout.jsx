import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const AdminLayout = () => {
  return (
    <div className="flex">
      <aside className="w-64 bg-gray-800 text-white min-h-screen p-4">
        <nav>
          <ul>
            <li className="mb-2"><Link to="/admin/profile" className="hover:text-gray-300">Profile</Link></li>
            <li className="mb-2"><Link to="/admin/skills" className="hover:text-gray-300">Skills</Link></li>
            <li className="mb-2"><Link to="/admin/projects" className="hover:text-gray-300">Projects</Link></li>
            <li className="mb-2"><Link to="/admin/blog" className="hover:text-gray-300">Blog</Link></li>
            <li className="mb-2"><Link to="/admin/social-links" className="hover:text-gray-300">Social Links</Link></li>
          </ul>
        </nav>
      </aside>
      <main className="flex-grow p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
