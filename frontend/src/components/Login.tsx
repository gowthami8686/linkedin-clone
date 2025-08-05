import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, AlertCircle } from 'lucide-react';

interface LoginProps {
  setIsAuthenticated: (value: boolean) => void;
}

const Login: React.FC<LoginProps> = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    // Get registered users from localStorage
    const registeredUsers = JSON.parse(localStorage.getItem('linkedin_users') || '[]');
    
    // Find user with matching email and password
    const user = registeredUsers.find((u: any) => 
      u.email === email && u.password === password
    );
    
    if (user) {
      // Simulate API call
      setTimeout(() => {
        localStorage.setItem('linkedin_token', 'mock_token');
        localStorage.setItem('linkedin_current_user', JSON.stringify(user));
        setIsAuthenticated(true);
        setIsLoading(false);
      }, 1000);
    } else {
      setTimeout(() => {
        setError('Invalid email or password. Please try again.');
        setIsLoading(false);
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen bg-linkedin-lightGray flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-linkedin-blue text-4xl font-bold mb-2">LinkedIn</h1>
          <h2 className="text-3xl font-bold text-linkedin-darkGray">Sign in</h2>
          <p className="mt-2 text-linkedin-gray">Stay updated on your professional world</p>
        </div>

        <div className="card p-8">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2">
              <AlertCircle className="w-5 h-5 text-red-500" />
              <span className="text-red-700 text-sm">{error}</span>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-linkedin-darkGray mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-linkedin-gray w-5 h-5" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field pl-10"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-linkedin-darkGray mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-linkedin-gray w-5 h-5" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field pl-10 pr-10"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-linkedin-gray hover:text-linkedin-darkGray"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-linkedin-blue focus:ring-linkedin-blue border-linkedin-border rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-linkedin-gray">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <button type="button" className="text-linkedin-blue hover:text-linkedin-darkBlue font-medium">
                  Forgot your password?
                </button>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full btn-primary py-3 text-base font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Signing in...' : 'Sign in'}
              </button>
            </div>

            <div className="text-center">
              <p className="text-sm text-linkedin-gray">
                New to LinkedIn?{' '}
                <Link to="/register" className="text-linkedin-blue hover:text-linkedin-darkBlue font-medium">
                  Join now
                </Link>
              </p>
            </div>
          </form>
        </div>

        <div className="text-center">
          <p className="text-xs text-linkedin-gray">
            By continuing, you agree to LinkedIn's{' '}
            <button type="button" className="text-linkedin-blue hover:underline">User Agreement</button>
            ,{' '}
            <button type="button" className="text-linkedin-blue hover:underline">Privacy Policy</button>
            , and{' '}
            <button type="button" className="text-linkedin-blue hover:underline">Cookie Policy</button>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login; 