import React, { useState, useEffect } from 'react';
import { supabase } from '../utils/supabase';
import toast from 'react-hot-toast';

const BlogAdmin = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: '', content: '', excerpt: '', tags: [], is_published: false });
  const [editingPost, setEditingPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('posts').select('*').order('created_at', { ascending: false });
    if (error) console.error('Error fetching posts:', error);
    else setPosts(data);
    setLoading(false);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    const { error } = await supabase.from('posts').insert([newPost]);
    if (error) toast.error('Failed to create post.');
    else {
      toast.success('Post created!');
      setNewPost({ title: '', content: '', excerpt: '', tags: [], is_published: false });
      fetchPosts();
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const { error } = await supabase.from('posts').update(editingPost).eq('id', editingPost.id);
    if (error) toast.error('Failed to update post.');
    else {
      toast.success('Post updated!');
      setEditingPost(null);
      fetchPosts();
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      const { error } = await supabase.from('posts').delete().eq('id', id);
      if (error) toast.error('Failed to delete post.');
      else {
        toast.success('Post deleted!');
        fetchPosts();
      }
    }
  };

  if (loading) return <div>Loading posts...</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Manage Blog Posts</h1>

      <form onSubmit={editingPost ? handleUpdate : handleCreate} className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-bold mb-4">{editingPost ? 'Edit Post' : 'Add New Post'}</h2>
        {/* Form fields for post details */}
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          {editingPost ? 'Update Post' : 'Create Post'}
        </button>
        {editingPost && <button onClick={() => setEditingPost(null)} className="ml-2 text-gray-500">Cancel</button>}
      </form>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Existing Posts</h2>
        <ul>
          {posts.map(post => (
            <li key={post.id} className="flex justify-between items-center mb-2">
              <span>{post.title}</span>
              <div>
                <button onClick={() => setEditingPost(post)} className="text-blue-500 mr-2">Edit</button>
                <button onClick={() => handleDelete(post.id)} className="text-red-500">Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BlogAdmin;
