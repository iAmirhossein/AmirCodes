import React, { useState, useEffect } from 'react';
import { supabase } from '../utils/supabase';
import toast from 'react-hot-toast';

const SocialLinksAdmin = () => {
  const [links, setLinks] = useState([]);
  const [newLink, setNewLink] = useState({ name: '', url: '' });
  const [editingLink, setEditingLink] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLinks();
  }, []);

  const fetchLinks = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('social_links').select('*').order('name');
    if (error) console.error('Error fetching links:', error);
    else setLinks(data);
    setLoading(false);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    const { error } = await supabase.from('social_links').insert([newLink]);
    if (error) toast.error('Failed to create link.');
    else {
      toast.success('Link created!');
      setNewLink({ name: '', url: '' });
      fetchLinks();
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const { error } = await supabase.from('social_links').update(editingLink).eq('id', editingLink.id);
    if (error) toast.error('Failed to update link.');
    else {
      toast.success('Link updated!');
      setEditingLink(null);
      fetchLinks();
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this link?')) {
      const { error } = await supabase.from('social_links').delete().eq('id', id);
      if (error) toast.error('Failed to delete link.');
      else {
        toast.success('Link deleted!');
        fetchLinks();
      }
    }
  };

  if (loading) return <div>Loading links...</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Manage Social Links</h1>

      <form onSubmit={editingLink ? handleUpdate : handleCreate} className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-bold mb-4">{editingLink ? 'Edit Link' : 'Add New Link'}</h2>
        {/* Form fields for social link details */}
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          {editingLink ? 'Update Link' : 'Create Link'}
        </button>
        {editingLink && <button onClick={() => setEditingLink(null)} className="ml-2 text-gray-500">Cancel</button>}
      </form>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Existing Links</h2>
        <ul>
          {links.map(link => (
            <li key={link.id} className="flex justify-between items-center mb-2">
              <span>{link.name}</span>
              <div>
                <button onClick={() => setEditingLink(link)} className="text-blue-500 mr-2">Edit</button>
                <button onClick={() => handleDelete(link.id)} className="text-red-500">Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SocialLinksAdmin;
