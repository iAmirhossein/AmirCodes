import React, { useEffect, useState } from 'react';
import { supabase } from '../utils/supabase';

const Dashboard = () => {
  const [stats, setStats] = useState({
    projects: 0,
    skills: 0,
    posts: 0,
    messages: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      const { data: projects, error: projectsError } = await supabase.from('projects').select('id', { count: 'exact' });
      const { data: skills, error: skillsError } = await supabase.from('skills').select('id', { count: 'exact' });
      const { data: posts, error: postsError } = await supabase.from('posts').select('id', { count: 'exact' });
      const { data: messages, error: messagesError } = await supabase.from('messages').select('id', { count: 'exact' });

      if (projectsError || skillsError || postsError || messagesError) {
        console.error('Error fetching stats:', projectsError || skillsError || postsError || messagesError);
      } else {
        setStats({
          projects: projects.length,
          skills: skills.length,
          posts: posts.length,
          messages: messages.length,
        });
      }
      setLoading(false);
    };

    fetchStats();
  }, []);

  if (loading) {
    return <div>Loading dashboard...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-bold">{stats.projects}</h2>
          <p className="text-gray-600">Projects</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-bold">{stats.skills}</h2>
          <p className="text-gray-600">Skills</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-bold">{stats.posts}</h2>
          <p className="text-gray-600">Blog Posts</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-bold">{stats.messages}</h2>
          <p className="text-gray-600">Messages</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
