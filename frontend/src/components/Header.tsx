import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Search, 
  Home, 
  Network, 
  Briefcase, 
  MessageCircle, 
  Bell, 
  User,
  Settings,
  LogOut
} from 'lucide-react';

interface HeaderProps {
  currentUser: any;
  setIsAuthenticated: (value: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ currentUser, setIsAuthenticated }) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('linkedin_token');
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-linkedin-border z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="text-linkedin-blue text-2xl font-bold">
              LinkedIn
            </Link>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-md mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-linkedin-gray w-4 h-4" />
              <input
                type="text"
                placeholder="Search"
                className="w-full pl-10 pr-4 py-2 bg-linkedin-lightGray border border-linkedin-border rounded-full focus:outline-none focus:ring-2 focus:ring-linkedin-blue"
              />
            </div>
          </div>

          {/* Navigation Icons */}
          <nav className="flex items-center space-x-6">
            <Link to="/" className="flex flex-col items-center text-linkedin-gray hover:text-linkedin-blue">
              <Home className="w-6 h-6" />
              <span className="text-xs mt-1">Home</span>
            </Link>
            
            <Link to="/network" className="flex flex-col items-center text-linkedin-gray hover:text-linkedin-blue">
              <Network className="w-6 h-6" />
              <span className="text-xs mt-1">Network</span>
            </Link>
            
            <Link to="/jobs" className="flex flex-col items-center text-linkedin-gray hover:text-linkedin-blue">
              <Briefcase className="w-6 h-6" />
              <span className="text-xs mt-1">Jobs</span>
            </Link>
            
            <Link to="/messaging" className="flex flex-col items-center text-linkedin-gray hover:text-linkedin-blue">
              <MessageCircle className="w-6 h-6" />
              <span className="text-xs mt-1">Messaging</span>
            </Link>
            
            <Link to="/notifications" className="flex flex-col items-center text-linkedin-gray hover:text-linkedin-blue relative">
              <Bell className="w-6 h-6" />
              <span className="text-xs mt-1">Notifications</span>
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                3
              </span>
            </Link>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex flex-col items-center text-linkedin-gray hover:text-linkedin-blue"
              >
                <div className="w-8 h-8 bg-linkedin-blue rounded-full flex items-center justify-center text-white font-semibold">
                  {currentUser?.name?.charAt(0) || 'U'}
                </div>
                <span className="text-xs mt-1">Me</span>
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-linkedin-border rounded-lg shadow-lg py-2">
                  <Link
                    to="/profile"
                    className="flex items-center px-4 py-2 text-linkedin-gray hover:bg-gray-50"
                    onClick={() => setShowUserMenu(false)}
                  >
                    <User className="w-4 h-4 mr-3" />
                    View Profile
                  </Link>
                  <Link
                    to="/settings"
                    className="flex items-center px-4 py-2 text-linkedin-gray hover:bg-gray-50"
                    onClick={() => setShowUserMenu(false)}
                  >
                    <Settings className="w-4 h-4 mr-3" />
                    Settings
                  </Link>
                  <hr className="my-2" />
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-2 text-linkedin-gray hover:bg-gray-50"
                  >
                    <LogOut className="w-4 h-4 mr-3" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header; 