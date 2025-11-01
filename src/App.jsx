import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Helmet } from 'react-helmet';

// Public Pages
import Home from './pages/Home';
import Skills from './pages/Skills';
import Projects from './pages/Projects';
import Blog from './pages/Blog';
import PostDetail from './pages/PostDetail';
import Contact from './pages/Contact';
import Login from './pages/Login';

// Admin Pages
import AdminLayout from './admin/AdminLayout';
import Dashboard from './admin/Dashboard';
import ProfileEdit from './admin/ProfileEdit';
import SkillsAdmin from './admin/SkillsAdmin';
import ProjectsAdmin from './admin/ProjectsAdmin';
import BlogAdmin from './admin/BlogAdmin';
import SocialLinksAdmin from './admin/SocialLinksAdmin';

// Components
import Header from './components/Header';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Helmet>
        <title>Amir Codes</title>
        <meta name="description" content="The personal portfolio of a passionate software developer." />
      </Helmet>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:postId" element={<PostDetail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />

            {/* Admin Routes */}
            <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
              <Route index element={<Dashboard />} />
              <Route path="profile" element={<ProfileEdit />} />
              <Route path="skills" element={<SkillsAdmin />} />
              <Route path="projects" element={<ProjectsAdmin />} />
              <Route path="blog" element={<BlogAdmin />} />
              <Route path="social-links" element={<SocialLinksAdmin />} />
            </Route>
          </Routes>
        </main>
        <Footer />
        <Toaster />
      </div>
    </Router>
  );
}

export default App;
