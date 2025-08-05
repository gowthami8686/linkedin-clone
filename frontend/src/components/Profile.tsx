import React, { useState, useEffect } from 'react';
import { Edit, Plus, Save, X, Trash2, MapPin, Calendar, Building, GraduationCap } from 'lucide-react';

interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

interface Education {
  id: string;
  degree: string;
  school: string;
  startDate: string;
  endDate: string;
  current: boolean;
}

interface ProfileData {
  firstName: string;
  lastName: string;
  headline: string;
  location: string;
  about: string;
  experience: Experience[];
  education: Education[];
}

const Profile: React.FC = () => {
  const [profileData, setProfileData] = useState<ProfileData>({
    firstName: 'Your',
    lastName: 'Name',
    headline: 'Software Developer',
    location: 'San Francisco, CA',
    about: 'Passionate software developer with expertise in React, TypeScript, and modern web technologies. I love building scalable applications and contributing to open-source projects.',
    experience: [
      {
        id: '1',
        title: 'Senior Software Developer',
        company: 'TechCorp Inc.',
        location: 'San Francisco, CA',
        startDate: '2022-01',
        endDate: '',
        current: true,
        description: 'Leading development of scalable web applications using React and Node.js.'
      },
      {
        id: '2',
        title: 'Software Developer',
        company: 'StartupXYZ',
        location: 'Remote',
        startDate: '2020-03',
        endDate: '2021-12',
        current: false,
        description: 'Developed and maintained multiple web applications using modern technologies.'
      }
    ],
    education: [
      {
        id: '1',
        degree: 'Bachelor of Science in Computer Science',
        school: 'University of Technology',
        startDate: '2016',
        endDate: '2020',
        current: false
      }
    ]
  });

  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [editData, setEditData] = useState<any>({});

  // Load profile data from localStorage on component mount
  useEffect(() => {
    const savedProfile = localStorage.getItem('linkedin_profile');
    if (savedProfile) {
      setProfileData(JSON.parse(savedProfile));
    }
  }, []);

  // Save profile data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('linkedin_profile', JSON.stringify(profileData));
  }, [profileData]);

  const handleEditProfile = () => {
    setEditData({
      firstName: profileData.firstName,
      lastName: profileData.lastName,
      headline: profileData.headline,
      location: profileData.location
    });
    setEditingSection('profile');
  };

  const handleEditAbout = () => {
    setEditData({ about: profileData.about });
    setEditingSection('about');
  };

  const handleEditExperience = (experience?: Experience) => {
    if (experience) {
      setEditData({ ...experience });
    } else {
      setEditData({
        id: Date.now().toString(),
        title: '',
        company: '',
        location: '',
        startDate: '',
        endDate: '',
        current: false,
        description: ''
      });
    }
    setEditingSection('experience');
  };

  const handleEditEducation = (education?: Education) => {
    if (education) {
      setEditData({ ...education });
    } else {
      setEditData({
        id: Date.now().toString(),
        degree: '',
        school: '',
        startDate: '',
        endDate: '',
        current: false
      });
    }
    setEditingSection('education');
  };

  const handleSave = () => {
    if (editingSection === 'profile') {
      setProfileData(prev => ({
        ...prev,
        ...editData
      }));
    } else if (editingSection === 'about') {
      setProfileData(prev => ({
        ...prev,
        about: editData.about
      }));
    } else if (editingSection === 'experience') {
      const existingIndex = profileData.experience.findIndex(exp => exp.id === editData.id);
      if (existingIndex >= 0) {
        setProfileData(prev => ({
          ...prev,
          experience: prev.experience.map((exp, index) => 
            index === existingIndex ? editData : exp
          )
        }));
      } else {
        setProfileData(prev => ({
          ...prev,
          experience: [...prev.experience, editData]
        }));
      }
    } else if (editingSection === 'education') {
      const existingIndex = profileData.education.findIndex(edu => edu.id === editData.id);
      if (existingIndex >= 0) {
        setProfileData(prev => ({
          ...prev,
          education: prev.education.map((edu, index) => 
            index === existingIndex ? editData : edu
          )
        }));
      } else {
        setProfileData(prev => ({
          ...prev,
          education: [...prev.education, editData]
        }));
      }
    }
    setEditingSection(null);
    setEditData({});
  };

  const handleCancel = () => {
    setEditingSection(null);
    setEditData({});
  };

  const handleDelete = (section: string, id: string) => {
    if (section === 'experience') {
      setProfileData(prev => ({
        ...prev,
        experience: prev.experience.filter(exp => exp.id !== id)
      }));
    } else if (section === 'education') {
      setProfileData(prev => ({
        ...prev,
        education: prev.education.filter(edu => edu.id !== id)
      }));
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString + '-01');
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  const getInitials = () => {
    return `${profileData.firstName.charAt(0)}${profileData.lastName.charAt(0)}`.toUpperCase();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Profile Header */}
      <div className="card p-6">
        <div className="relative">
          <div className="h-32 bg-gradient-to-r from-linkedin-blue to-linkedin-darkBlue rounded-t-lg"></div>
          <div className="absolute bottom-0 left-6 transform translate-y-1/2">
            <div className="w-24 h-24 bg-linkedin-blue rounded-full border-4 border-white flex items-center justify-center text-white text-2xl font-bold">
              {getInitials()}
            </div>
          </div>
        </div>
        <div className="mt-12 ml-6">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold text-linkedin-darkGray">
                {profileData.firstName} {profileData.lastName}
              </h1>
              <p className="text-linkedin-gray">{profileData.headline}</p>
              <p className="text-sm text-linkedin-gray">
                {profileData.location} • 500+ connections
              </p>
            </div>
            <div className="flex space-x-2">
              <button 
                onClick={handleEditProfile}
                className="btn-secondary"
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit profile
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {editingSection === 'profile' && (
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-linkedin-darkGray">Edit Profile</h2>
            <button onClick={handleCancel} className="text-linkedin-gray hover:text-linkedin-darkGray">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-linkedin-darkGray mb-2">First Name</label>
                <input
                  type="text"
                  value={editData.firstName || ''}
                  onChange={(e) => setEditData({...editData, firstName: e.target.value})}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-linkedin-darkGray mb-2">Last Name</label>
                <input
                  type="text"
                  value={editData.lastName || ''}
                  onChange={(e) => setEditData({...editData, lastName: e.target.value})}
                  className="input-field"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-linkedin-darkGray mb-2">Headline</label>
              <input
                type="text"
                value={editData.headline || ''}
                onChange={(e) => setEditData({...editData, headline: e.target.value})}
                className="input-field"
                placeholder="e.g., Software Developer"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-linkedin-darkGray mb-2">Location</label>
              <input
                type="text"
                value={editData.location || ''}
                onChange={(e) => setEditData({...editData, location: e.target.value})}
                className="input-field"
                placeholder="e.g., San Francisco, CA"
              />
            </div>
            <div className="flex space-x-2">
              <button onClick={handleSave} className="btn-primary">
                <Save className="w-4 h-4 mr-2" />
                Save
              </button>
              <button onClick={handleCancel} className="btn-secondary">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* About */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-linkedin-darkGray">About</h2>
          <button 
            onClick={handleEditAbout}
            className="text-linkedin-blue hover:text-linkedin-darkBlue"
          >
            <Edit className="w-4 h-4" />
          </button>
        </div>
        {editingSection === 'about' ? (
          <div className="space-y-4">
            <textarea
              value={editData.about || ''}
              onChange={(e) => setEditData({...editData, about: e.target.value})}
              className="input-field h-32 resize-none"
              placeholder="Tell people about yourself..."
            />
            <div className="flex space-x-2">
              <button onClick={handleSave} className="btn-primary">
                <Save className="w-4 h-4 mr-2" />
                Save
              </button>
              <button onClick={handleCancel} className="btn-secondary">
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <p className="text-linkedin-gray">{profileData.about}</p>
        )}
      </div>

      {/* Experience */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-linkedin-darkGray">Experience</h2>
          <button 
            onClick={() => handleEditExperience()}
            className="text-linkedin-blue hover:text-linkedin-darkBlue"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
        <div className="space-y-4">
          {profileData.experience.map((exp) => (
            <div key={exp.id} className="border-l-4 border-linkedin-blue pl-4 relative">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-linkedin-darkGray">{exp.title}</h3>
                  <p className="text-linkedin-blue">{exp.company}</p>
                  <p className="text-sm text-linkedin-gray">
                    {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                  </p>
                  <p className="text-sm text-linkedin-gray">{exp.location}</p>
                  {exp.description && (
                    <p className="text-sm text-linkedin-gray mt-2">{exp.description}</p>
                  )}
                </div>
                <div className="flex space-x-2 ml-4">
                  <button 
                    onClick={() => handleEditExperience(exp)}
                    className="text-linkedin-blue hover:text-linkedin-darkBlue"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleDelete('experience', exp.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Edit Experience Modal */}
        {editingSection === 'experience' && (
          <div className="mt-4 p-4 border border-linkedin-border rounded-lg bg-gray-50">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-linkedin-darkGray">
                {editData.id && profileData.experience.find(exp => exp.id === editData.id) ? 'Edit Experience' : 'Add Experience'}
              </h3>
              <button onClick={handleCancel} className="text-linkedin-gray hover:text-linkedin-darkGray">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-linkedin-darkGray mb-2">Title</label>
                <input
                  type="text"
                  value={editData.title || ''}
                  onChange={(e) => setEditData({...editData, title: e.target.value})}
                  className="input-field"
                  placeholder="e.g., Software Developer"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-linkedin-darkGray mb-2">Company</label>
                <input
                  type="text"
                  value={editData.company || ''}
                  onChange={(e) => setEditData({...editData, company: e.target.value})}
                  className="input-field"
                  placeholder="e.g., TechCorp Inc."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-linkedin-darkGray mb-2">Location</label>
                <input
                  type="text"
                  value={editData.location || ''}
                  onChange={(e) => setEditData({...editData, location: e.target.value})}
                  className="input-field"
                  placeholder="e.g., San Francisco, CA"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-linkedin-darkGray mb-2">Start Date</label>
                  <input
                    type="month"
                    value={editData.startDate || ''}
                    onChange={(e) => setEditData({...editData, startDate: e.target.value})}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-linkedin-darkGray mb-2">End Date</label>
                  <input
                    type="month"
                    value={editData.endDate || ''}
                    onChange={(e) => setEditData({...editData, endDate: e.target.value})}
                    className="input-field"
                    disabled={editData.current}
                  />
                </div>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="current"
                  checked={editData.current || false}
                  onChange={(e) => setEditData({...editData, current: e.target.checked})}
                  className="h-4 w-4 text-linkedin-blue focus:ring-linkedin-blue border-linkedin-border rounded"
                />
                <label htmlFor="current" className="ml-2 block text-sm text-linkedin-gray">
                  I currently work here
                </label>
              </div>
              <div>
                <label className="block text-sm font-medium text-linkedin-darkGray mb-2">Description</label>
                <textarea
                  value={editData.description || ''}
                  onChange={(e) => setEditData({...editData, description: e.target.value})}
                  className="input-field h-20 resize-none"
                  placeholder="Describe your role and achievements..."
                />
              </div>
              <div className="flex space-x-2">
                <button onClick={handleSave} className="btn-primary">
                  <Save className="w-4 h-4 mr-2" />
                  Save
                </button>
                <button onClick={handleCancel} className="btn-secondary">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Education */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-linkedin-darkGray">Education</h2>
          <button 
            onClick={() => handleEditEducation()}
            className="text-linkedin-blue hover:text-linkedin-darkBlue"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
        <div className="space-y-4">
          {profileData.education.map((edu) => (
            <div key={edu.id} className="border-l-4 border-linkedin-blue pl-4 relative">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-linkedin-darkGray">{edu.degree}</h3>
                  <p className="text-linkedin-blue">{edu.school}</p>
                  <p className="text-sm text-linkedin-gray">
                    {edu.startDate} - {edu.current ? 'Present' : edu.endDate}
                  </p>
                </div>
                <div className="flex space-x-2 ml-4">
                  <button 
                    onClick={() => handleEditEducation(edu)}
                    className="text-linkedin-blue hover:text-linkedin-darkBlue"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleDelete('education', edu.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Edit Education Modal */}
        {editingSection === 'education' && (
          <div className="mt-4 p-4 border border-linkedin-border rounded-lg bg-gray-50">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-linkedin-darkGray">
                {editData.id && profileData.education.find(edu => edu.id === editData.id) ? 'Edit Education' : 'Add Education'}
              </h3>
              <button onClick={handleCancel} className="text-linkedin-gray hover:text-linkedin-darkGray">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-linkedin-darkGray mb-2">Degree</label>
                <input
                  type="text"
                  value={editData.degree || ''}
                  onChange={(e) => setEditData({...editData, degree: e.target.value})}
                  className="input-field"
                  placeholder="e.g., Bachelor of Science in Computer Science"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-linkedin-darkGray mb-2">School</label>
                <input
                  type="text"
                  value={editData.school || ''}
                  onChange={(e) => setEditData({...editData, school: e.target.value})}
                  className="input-field"
                  placeholder="e.g., University of Technology"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-linkedin-darkGray mb-2">Start Year</label>
                  <input
                    type="number"
                    value={editData.startDate || ''}
                    onChange={(e) => setEditData({...editData, startDate: e.target.value})}
                    className="input-field"
                    placeholder="e.g., 2016"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-linkedin-darkGray mb-2">End Year</label>
                  <input
                    type="number"
                    value={editData.endDate || ''}
                    onChange={(e) => setEditData({...editData, endDate: e.target.value})}
                    className="input-field"
                    placeholder="e.g., 2020"
                    disabled={editData.current}
                  />
                </div>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="current-edu"
                  checked={editData.current || false}
                  onChange={(e) => setEditData({...editData, current: e.target.checked})}
                  className="h-4 w-4 text-linkedin-blue focus:ring-linkedin-blue border-linkedin-border rounded"
                />
                <label htmlFor="current-edu" className="ml-2 block text-sm text-linkedin-gray">
                  I currently study here
                </label>
              </div>
              <div className="flex space-x-2">
                <button onClick={handleSave} className="btn-primary">
                  <Save className="w-4 h-4 mr-2" />
                  Save
                </button>
                <button onClick={handleCancel} className="btn-secondary">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile; 