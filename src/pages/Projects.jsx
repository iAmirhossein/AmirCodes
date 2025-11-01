import React, { useState, useEffect } from 'react';
import { supabase } from '../utils/supabase';
import { Helmet } from 'react-helmet';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('is_public', true)
        .order('display_order', { ascending: true });

      if (error) {
        console.error('Error fetching projects:', error);
      } else {
        setProjects(data);
      }
      setLoading(false);
    };

    fetchProjects();
  }, []);

  return (
    <>
      <Helmet>
        <title>Projects | Amir Codes</title>
        <meta name="description" content="A showcase of public projects." />
      </Helmet>
      <div className="container mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-center mb-8">Projects</h1>
        {loading ? (
          <div className="text-center">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map(project => (
              <div key={project.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <img src={project.thumbnail_url || 'https://via.placeholder.com/400x200'} alt={project.title} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-gray-700 mb-4">{project.description}</p>
                  <div className="flex justify-between">
                    {project.live_url && <a href={project.live_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Live Demo</a>}
                    {project.source_url && <a href={project.source_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Source Code</a>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Projects;
