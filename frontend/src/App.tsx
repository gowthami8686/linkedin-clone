import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Feed from './components/Feed';
import Profile from './components/Profile';
import Network from './components/Network';
import Jobs from './components/Jobs';
import Messaging from './components/Messaging';
import Notifications from './components/Notifications';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState<any>(null);

  // Mock authentication check
  React.useEffect(() => {
    const token = localStorage.getItem('linkedin_token');
    const user = localStorage.getItem('linkedin_current_user');
    
    if (token && user) {
      setIsAuthenticated(true);
      setCurrentUser(JSON.parse(user));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('linkedin_token');
    localStorage.removeItem('linkedin_current_user');
    setIsAuthenticated(false);
    setCurrentUser(null);
  };

  if (!isAuthenticated) {
    return (
      <Router>
        <Routes>
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/register" element={<Register setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="*" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        </Routes>
      </Router>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-linkedin-lightGray">
        <Header currentUser={currentUser} setIsAuthenticated={handleLogout} />
        <div className="flex">
          <Sidebar />
          <main className="flex-1 max-w-4xl mx-auto pt-20 px-4">
            <Routes>
              <Route path="/" element={<Feed />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/network" element={<Network />} />
              <Route path="/jobs" element={<Jobs />} />
              <Route path="/messaging" element={<Messaging />} />
              <Route path="/notifications" element={<Notifications />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App; 