import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../utils/supabase';
import { Helmet } from 'react-helmet';
import ReactMarkdown from 'react-markdown';

const PostDetail = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('id', postId)
        .single();

      if (error) {
        console.error('Error fetching post:', error);
      } else {
        setPost(data);
      }
      setLoading(false);
    };

    fetchPost();
  }, [postId]);

  if (loading) {
    return <div className="text-center p-8">Loading...</div>;
  }

  if (!post) {
    return <div className="text-center p-8">Post not found.</div>;
  }

  return (
    <>
      <Helmet>
        <title>{post.title} | Amir Codes</title>
        <meta name="description" content={post.excerpt} />
      </Helmet>
      <div className="container mx-auto px-6 py-12">
        <article className="prose lg:prose-xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <div className="text-sm text-gray-500 mb-8">
            <span>{new Date(post.created_at).toLocaleDateString()}</span>
            <span className="mx-2">&bull;</span>
            <span>{post.tags.join(', ')}</span>
          </div>
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </article>
      </div>
    </>
  );
};

export default PostDetail;
