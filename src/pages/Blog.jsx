import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../utils/supabase';
import { Helmet } from 'react-helmet';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('is_published', true)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching posts:', error);
      } else {
        setPosts(data);
      }
      setLoading(false);
    };

    fetchPosts();
  }, []);

  return (
    <>
      <Helmet>
        <title>Blog | Amir Codes</title>
        <meta name="description" content="A collection of blog posts on various tech topics." />
      </Helmet>
      <div className="container mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-center mb-8">Blog</h1>
        {loading ? (
          <div className="text-center">Loading...</div>
        ) : (
          <div className="space-y-8">
            {posts.map(post => (
              <div key={post.id} className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold mb-2">
                  <Link to={`/blog/${post.id}`} className="hover:underline">{post.title}</Link>
                </h2>
                <div className="text-sm text-gray-500 mb-2">
                  <span>{new Date(post.created_at).toLocaleDateString()}</span>
                  <span className="mx-2">&bull;</span>
                  <span>{post.tags.join(', ')}</span>
                </div>
                <p className="text-gray-700">{post.excerpt}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Blog;
