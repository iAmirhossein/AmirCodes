import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/auth';
import { Helmet } from 'react-helmet';
import toast from 'react-hot-toast';

const Login = () => {
  const { user, signInWithPassword, signInWithGitHub } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/admin');
    }
  }, [user, navigate]);

  const handlePasswordLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithPassword(email, password);
      toast.success('Logged in successfully!');
      navigate('/admin');
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  };

  const handleGitHubLogin = async () => {
    try {
      await signInWithGitHub();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <Helmet>
        <title>Login | Amir Codes</title>
        <meta name="description" content="Admin login page." />
      </Helmet>
      <div className="container mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-center mb-8">Admin Login</h1>
        <div className="max-w-md mx-auto">
          <form onSubmit={handlePasswordLogin} className="bg-white rounded-lg shadow-md p-8">
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700 font-bold mb-2">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
                required
              />
            </div>
            <div className="text-center mb-4">
              <button
                type="submit"
                className="w-full bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition duration-300"
                disabled={loading}
              >
                {loading ? 'Logging in...' : 'Login with Email'}
              </button>
            </div>
          </form>
          <div className="text-center mt-4">
            <button
              onClick={handleGitHubLogin}
              className="w-full bg-gray-800 text-white px-6 py-2 rounded-full hover:bg-gray-900 transition duration-300"
            >
              Login with GitHub
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
