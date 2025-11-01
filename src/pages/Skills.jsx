import React, { useState, useEffect } from 'react';
import { supabase } from '../utils/supabase';
import { Helmet } from 'react-helmet';

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [skillTypes, setSkillTypes] = useState([]);
  const [selectedType, setSelectedType] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSkills = async () => {
      setLoading(true);
      let query = supabase.from('skills').select('*');
      if (selectedType !== 'All') {
        query = query.eq('type', selectedType);
      }
      const { data, error } = await query;
      if (error) {
        console.error('Error fetching skills:', error);
      } else {
        setSkills(data);
      }
      setLoading(false);
    };

    fetchSkills();
  }, [selectedType]);

  useEffect(() => {
    const fetchSkillTypes = async () => {
      const { data, error } = await supabase
        .from('skills')
        .select('type');
      if (error) {
        console.error('Error fetching skill types:', error);
      } else {
        const uniqueTypes = [...new Set(data.map(skill => skill.type))];
        setSkillTypes(['All', ...uniqueTypes]);
      }
    };
    fetchSkillTypes();
  }, []);

  return (
    <>
      <Helmet>
        <title>Skills | Amir Codes</title>
        <meta name="description" content="A list of technical skills and proficiencies." />
      </Helmet>
      <div className="container mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-center mb-8">Skills</h1>
        <div className="text-center mb-8">
          {skillTypes.map(type => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-4 py-2 mx-2 rounded-full ${selectedType === type ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              {type}
            </button>
          ))}
        </div>
        {loading ? (
          <div className="text-center">Loading...</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
            {skills.map(skill => (
              <div key={skill.id} className="text-center">
                <i className={`${skill.icon_class} text-4xl mb-2`}></i> {/* Assuming Font Awesome classes */}
                <h3 className="font-semibold">{skill.name}</h3>
                <p className="text-sm text-gray-600">{skill.proficiency}%</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Skills;
