import React, { useState, useEffect } from 'react';
import { supabase } from '../utils/supabase';
import { useAuth } from '../utils/auth';
import toast from 'react-hot-toast';

const ProfileEdit = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState({ bio: '', avatar_url: '', resume_url: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        setLoading(true);
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
        if (error) {
          console.error('Error fetching profile:', error);
        } else if (data) {
          setProfile(data);
        }
        setLoading(false);
      }
    };
    fetchProfile();
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase
      .from('profiles')
      .update(profile)
      .eq('id', user.id);
    if (error) {
      toast.error('Failed to update profile.');
      console.error(error);
    } else {
      toast.success('Profile updated successfully!');
    }
    setLoading(false);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Edit Profile</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block font-bold mb-1">Bio</label>
          <textarea name="bio" value={profile.bio} onChange={handleChange} className="w-full p-2 border rounded" rows="5"></textarea>
        </div>
        <div className="mb-4">
          <label className="block font-bold mb-1">Avatar URL</label>
          <input type="text" name="avatar_url" value={profile.avatar_url} onChange={handleChange} className="w-full p-2 border rounded" />
        </div>
        <div className="mb-4">
          <label className="block font-bold mb-1">Resume URL</label>
          <input type="text" name="resume_url" value={profile.resume_url} onChange={handleChange} className="w-full p-2 border rounded" />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded" disabled={loading}>
          {loading ? 'Saving...' : 'Save Profile'}
        </button>
      </form>
    </div>
  );
};

export default ProfileEdit;
