import React, { useState, useEffect } from 'react';
import { supabase } from '../utils/supabase';
import toast from 'react-hot-toast';

const ProjectsAdmin = () => {
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({ title: '', description: '', is_public: false, display_order: 0 });
  const [editingProject, setEditingProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('projects').select('*').order('display_order');
    if (error) console.error('Error fetching projects:', error);
    else setProjects(data);
    setLoading(false);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    const { error } = await supabase.from('projects').insert([newProject]);
    if (error) toast.error('Failed to create project.');
    else {
      toast.success('Project created!');
      setNewProject({ title: '', description: '', is_public: false, display_order: 0 });
      fetchProjects();
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const { error } = await supabase.from('projects').update(editingProject).eq('id', editingProject.id);
    if (error) toast.error('Failed to update project.');
    else {
      toast.success('Project updated!');
      setEditingProject(null);
      fetchProjects();
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      const { error } = await supabase.from('projects').delete().eq('id', id);
      if (error) toast.error('Failed to delete project.');
      else {
        toast.success('Project deleted!');
        fetchProjects();
      }
    }
  };

  if (loading) return <div>Loading projects...</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Manage Projects</h1>

      <form onSubmit={editingProject ? handleUpdate : handleCreate} className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-bold mb-4">{editingProject ? 'Edit Project' : 'Add New Project'}</h2>
        {/* Form fields for project details */}
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          {editingProject ? 'Update Project' : 'Create Project'}
        </button>
        {editingProject && <button onClick={() => setEditingProject(null)} className="ml-2 text-gray-500">Cancel</button>}
      </form>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Existing Projects</h2>
        <ul>
          {projects.map(project => (
            <li key={project.id} className="flex justify-between items-center mb-2">
              <span>{project.title}</span>
              <div>
                <button onClick={() => setEditingProject(project)} className="text-blue-500 mr-2">Edit</button>
                <button onClick={() => handleDelete(project.id)} className="text-red-500">Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProjectsAdmin;
