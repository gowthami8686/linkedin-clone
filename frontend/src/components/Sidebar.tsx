import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Bookmark, 
  Calendar, 
  Users, 
  TrendingUp, 
  Briefcase,
  Newspaper,
  Video,
  FileText
} from 'lucide-react';

const Sidebar: React.FC = () => {
  const quickActions = [
    { icon: Bookmark, label: 'My Items', href: '/my-items' },
    { icon: Calendar, label: 'Events', href: '/events' },
    { icon: Users, label: 'Groups', href: '/groups' },
    { icon: TrendingUp, label: 'Followed Hashtags', href: '/hashtags' },
  ];

  const learningItems = [
    { icon: Video, label: 'Learning', href: '/learning' },
    { icon: FileText, label: 'Articles', href: '/articles' },
  ];

  const mockConnections = [
    { name: 'Sarah Johnson', title: 'Software Engineer at Google', avatar: 'SJ' },
    { name: 'Mike Chen', title: 'Product Manager at Microsoft', avatar: 'MC' },
    { name: 'Emily Davis', title: 'UX Designer at Apple', avatar: 'ED' },
  ];

  return (
    <aside className="w-80 p-4 space-y-6">
      {/* Quick Actions */}
      <div className="card p-4">
        <h3 className="font-semibold text-linkedin-darkGray mb-4">Quick Actions</h3>
        <div className="space-y-2">
          {quickActions.map((action) => (
            <Link
              key={action.label}
              to={action.href}
              className="flex items-center p-2 rounded-md hover:bg-linkedin-lightBlue text-linkedin-gray hover:text-linkedin-blue transition-colors"
            >
              <action.icon className="w-5 h-5 mr-3" />
              <span className="text-sm">{action.label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Learning */}
      <div className="card p-4">
        <h3 className="font-semibold text-linkedin-darkGray mb-4">Learning</h3>
        <div className="space-y-2">
          {learningItems.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className="flex items-center p-2 rounded-md hover:bg-linkedin-lightBlue text-linkedin-gray hover:text-linkedin-blue transition-colors"
            >
              <item.icon className="w-5 h-5 mr-3" />
              <span className="text-sm">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Who to Follow */}
      <div className="card p-4">
        <h3 className="font-semibold text-linkedin-darkGray mb-4">Who to Follow</h3>
        <div className="space-y-3">
          {mockConnections.map((connection) => (
            <div key={connection.name} className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-linkedin-blue rounded-full flex items-center justify-center text-white font-semibold text-sm mr-3">
                  {connection.avatar}
                </div>
                <div>
                  <p className="text-sm font-medium text-linkedin-darkGray">{connection.name}</p>
                  <p className="text-xs text-linkedin-gray">{connection.title}</p>
                </div>
              </div>
              <button className="btn-primary text-xs px-3 py-1">
                Follow
              </button>
            </div>
          ))}
        </div>
        <button className="w-full mt-3 text-linkedin-blue text-sm font-medium hover:underline">
          See all
        </button>
      </div>

      {/* Job Recommendations */}
      <div className="card p-4">
        <h3 className="font-semibold text-linkedin-darkGray mb-4">Job Recommendations</h3>
        <div className="space-y-3">
          <div className="border-l-4 border-linkedin-blue pl-3">
            <p className="text-sm font-medium text-linkedin-darkGray">Senior React Developer</p>
            <p className="text-xs text-linkedin-gray">TechCorp Inc.</p>
            <p className="text-xs text-linkedin-gray">San Francisco, CA</p>
          </div>
          <div className="border-l-4 border-linkedin-blue pl-3">
            <p className="text-sm font-medium text-linkedin-darkGray">Product Manager</p>
            <p className="text-xs text-linkedin-gray">StartupXYZ</p>
            <p className="text-xs text-linkedin-gray">Remote</p>
          </div>
        </div>
        <Link to="/jobs" className="block w-full mt-3 text-linkedin-blue text-sm font-medium hover:underline text-center">
          See all jobs
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar; 