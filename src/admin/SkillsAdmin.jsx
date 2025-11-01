import React, { useState, useEffect } from 'react';
import { supabase } from '../utils/supabase';
import toast from 'react-hot-toast';

const SkillsAdmin = () => {
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState({ name: '', proficiency: 50, type: '', icon_class: '' });
  const [editingSkill, setEditingSkill] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('skills').select('*').order('name');
    if (error) console.error('Error fetching skills:', error);
    else setSkills(data);
    setLoading(false);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    const { error } = await supabase.from('skills').insert([newSkill]);
    if (error) toast.error('Failed to create skill.');
    else {
      toast.success('Skill created!');
      setNewSkill({ name: '', proficiency: 50, type: '', icon_class: '' });
      fetchSkills();
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const { error } = await supabase.from('skills').update(editingSkill).eq('id', editingSkill.id);
    if (error) toast.error('Failed to update skill.');
    else {
      toast.success('Skill updated!');
      setEditingSkill(null);
      fetchSkills();
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this skill?')) {
      const { error } = await supabase.from('skills').delete().eq('id', id);
      if (error) toast.error('Failed to delete skill.');
      else {
        toast.success('Skill deleted!');
        fetchSkills();
      }
    }
  };

  if (loading) return <div>Loading skills...</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Manage Skills</h1>

      {/* Create/Edit Form */}
      <form onSubmit={editingSkill ? handleUpdate : handleCreate} className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-bold mb-4">{editingSkill ? 'Edit Skill' : 'Add New Skill'}</h2>
        {/* Form fields */}
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          {editingSkill ? 'Update Skill' : 'Create Skill'}
        </button>
        {editingSkill && <button onClick={() => setEditingSkill(null)} className="ml-2 text-gray-500">Cancel</button>}
      </form>

      {/* Skills List */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Existing Skills</h2>
        <ul>
          {skills.map(skill => (
            <li key={skill.id} className="flex justify-between items-center mb-2">
              <span>{skill.name}</span>
              <div>
                <button onClick={() => setEditingSkill(skill)} className="text-blue-500 mr-2">Edit</button>
                <button onClick={() => handleDelete(skill.id)} className="text-red-500">Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SkillsAdmin;
