import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../utils/auth';
import toast from 'react-hot-toast';

const Header = () => {
  const { user, signOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success('Signed out successfully!');
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <header className="bg-gray-800 text-white shadow-md">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          Amir Codes
        </Link>
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/skills" className="hover:text-gray-300">Skills</Link>
          <Link to="/projects" className="hover:text-gray-300">Projects</Link>
          <Link to="/blog" className="hover:text-gray-300">Blog</Link>
          <Link to="/contact" className="hover:text-gray-300">Contact</Link>
          {user ? (
            <>
              <Link to="/admin" className="hover:text-gray-300">Admin</Link>
              <button onClick={handleSignOut} className="hover:text-gray-300">Logout</button>
            </>
          ) : (
            <Link to="/login" className="hover:text-gray-300">Login</Link>
          )}
        </div>
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden px-6 pb-4">
          <Link to="/skills" className="block py-2 hover:text-gray-300">Skills</Link>
          <Link to="/projects" className="block py-2 hover:text-gray-300">Projects</Link>
          <Link to="/blog" className="block py-2 hover:text-gray-300">Blog</Link>
          <Link to="/contact" className="block py-2 hover:text-gray-300">Contact</Link>
          {user ? (
            <>
              <Link to="/admin" className="block py-2 hover:text-gray-300">Admin</Link>
              <button onClick={handleSignOut} className="block py-2 hover:text-gray-300">Logout</button>
            </>
          ) : (
            <Link to="/login" className="block py-2 hover:text-gray-300">Login</Link>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
