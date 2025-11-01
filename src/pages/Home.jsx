import React, { useState, useEffect } from 'react';
import { supabase } from '../utils/supabase';
import { Helmet } from 'react-helmet';

const Home = () => {
  const [profile, setProfile] = useState(null);
  const [socialLinks, setSocialLinks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .single();
      if (error) {
        console.error('Error fetching profile:', error);
      } else {
        setProfile(data);
      }
    };

    const fetchSocialLinks = async () => {
      const { data, error } = await supabase
        .from('social_links')
        .select('*');
      if (error) {
        console.error('Error fetching social links:', error);
      } else {
        setSocialLinks(data);
      }
    };

    const fetchData = async () => {
      setLoading(true);
      await Promise.all([fetchProfile(), fetchSocialLinks()]);
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="text-center p-8">Loading...</div>;
  }

  return (
    <>
      <Helmet>
        <title>Home | Amir Codes</title>
        <meta name="description" content="Welcome to the personal portfolio of Amir, a passionate software developer." />
      </Helmet>
      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/3 text-center">
            <img
              src={profile?.avatar_url || 'https://via.placeholder.com/150'}
              alt="Avatar"
              className="w-40 h-40 rounded-full mx-auto mb-4"
            />
          </div>
          <div className="md:w-2/3 md:pl-12">
            <h1 className="text-4xl font-bold mb-4">Hi, I'm Amir</h1>
            <p className="text-lg text-gray-700 mb-6">{profile?.bio}</p>
            <div className="flex space-x-4 mb-6">
              {socialLinks.map(link => (
                <a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-700">
                  {/* You would typically use an icon library here */}
                  {link.name}
                </a>
              ))}
            </div>
            {profile?.resume_url && (
              <a
                href={profile.resume_url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition duration-300"
              >
                Download Resume
              </a>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
