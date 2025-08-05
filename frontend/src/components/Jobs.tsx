import React, { useState } from 'react';
import { Search, Filter, MapPin, Briefcase, Clock } from 'lucide-react';

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  posted: string;
  salary?: string;
  description: string;
}

const Jobs: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const mockJobs: Job[] = [
    {
      id: '1',
      title: 'Senior React Developer',
      company: 'TechCorp Inc.',
      location: 'San Francisco, CA',
      type: 'Full-time',
      posted: '2 days ago',
      salary: '$120,000 - $150,000',
      description: 'We are looking for an experienced React developer to join our team...'
    },
    {
      id: '2',
      title: 'Frontend Engineer',
      company: 'StartupXYZ',
      location: 'Remote',
      type: 'Full-time',
      posted: '1 week ago',
      salary: '$100,000 - $130,000',
      description: 'Join our fast-growing startup and help build amazing user experiences...'
    },
    {
      id: '3',
      title: 'UI/UX Developer',
      company: 'Design Studio',
      location: 'New York, NY',
      type: 'Contract',
      posted: '3 days ago',
      salary: '$80,000 - $110,000',
      description: 'Create beautiful and functional user interfaces for our clients...'
    }
  ];

  const filters = [
    { id: 'remote', label: 'Remote' },
    { id: 'full-time', label: 'Full-time' },
    { id: 'contract', label: 'Contract' },
    { id: 'entry-level', label: 'Entry Level' },
    { id: 'senior', label: 'Senior Level' }
  ];

  const toggleFilter = (filterId: string) => {
    setSelectedFilters(prev => 
      prev.includes(filterId) 
        ? prev.filter(id => id !== filterId)
        : [...prev, filterId]
    );
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Search and Filters */}
      <div className="card p-6">
        <div className="flex items-center space-x-4 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-linkedin-gray w-5 h-5" />
            <input
              type="text"
              placeholder="Search jobs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-linkedin-border rounded-lg focus:outline-none focus:ring-2 focus:ring-linkedin-blue"
            />
          </div>
          <button className="btn-secondary">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </button>
        </div>

        {/* Filter Tags */}
        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => toggleFilter(filter.id)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                selectedFilters.includes(filter.id)
                  ? 'bg-linkedin-blue text-white'
                  : 'bg-linkedin-lightBlue text-linkedin-gray hover:bg-linkedin-blue hover:text-white'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Job Listings */}
      <div className="space-y-4">
        {mockJobs.map((job) => (
          <div key={job.id} className="card p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h3 className="text-lg font-semibold text-linkedin-darkGray">{job.title}</h3>
                  <span className="px-2 py-1 bg-linkedin-lightBlue text-linkedin-blue text-xs rounded">
                    {job.type}
                  </span>
                </div>
                
                <div className="flex items-center space-x-4 text-sm text-linkedin-gray mb-3">
                  <div className="flex items-center">
                    <Briefcase className="w-4 h-4 mr-1" />
                    {job.company}
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {job.location}
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {job.posted}
                  </div>
                </div>

                {job.salary && (
                  <p className="text-sm text-linkedin-blue font-medium mb-2">{job.salary}</p>
                )}

                <p className="text-linkedin-gray text-sm mb-4">{job.description}</p>

                <div className="flex items-center space-x-3">
                  <button className="btn-primary text-sm px-4 py-2">
                    Apply
                  </button>
                  <button className="btn-secondary text-sm px-4 py-2">
                    Save
                  </button>
                  <button className="text-linkedin-blue hover:text-linkedin-darkBlue text-sm">
                    Share
                  </button>
                </div>
              </div>

              <div className="ml-4">
                <button className="text-linkedin-gray hover:text-linkedin-darkGray">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Job Recommendations */}
      <div className="card p-6">
        <h2 className="text-xl font-semibold text-linkedin-darkGray mb-4">Recommended for you</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockJobs.slice(0, 3).map((job) => (
            <div key={`rec-${job.id}`} className="border border-linkedin-border rounded-lg p-4 hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-linkedin-darkGray mb-2">{job.title}</h3>
              <p className="text-sm text-linkedin-gray mb-2">{job.company}</p>
              <p className="text-xs text-linkedin-gray mb-3">{job.location}</p>
              <button className="w-full btn-primary text-sm py-2">
                Apply
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Jobs; 