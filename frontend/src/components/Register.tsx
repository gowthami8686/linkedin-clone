import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, Phone, AlertCircle, CheckCircle } from 'lucide-react';

interface RegisterProps {
  setIsAuthenticated: (value: boolean) => void;
}

const Register: React.FC<RegisterProps> = ({ setIsAuthenticated }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');
    
    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    // Validate password length
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      setIsLoading(false);
      return;
    }

    // Get existing users
    const existingUsers = JSON.parse(localStorage.getItem('linkedin_users') || '[]');
    
    // Check if email already exists
    const userExists = existingUsers.find((u: any) => u.email === formData.email);
    if (userExists) {
      setError('An account with this email already exists');
      setIsLoading(false);
      return;
    }

    // Create new user
    const newUser = {
      id: Date.now().toString(),
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
      phone: formData.phone,
      createdAt: new Date().toISOString()
    };

    // Save user to localStorage
    existingUsers.push(newUser);
    localStorage.setItem('linkedin_users', JSON.stringify(existingUsers));
    
    // Simulate API call
    setTimeout(() => {
      setSuccess('Account created successfully! Redirecting to login...');
      setTimeout(() => {
        setIsAuthenticated(true);
        localStorage.setItem('linkedin_token', 'mock_token');
        localStorage.setItem('linkedin_current_user', JSON.stringify(newUser));
        setIsLoading(false);
      }, 2000);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-linkedin-lightGray flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-linkedin-blue text-4xl font-bold mb-2">LinkedIn</h1>
          <h2 className="text-3xl font-bold text-linkedin-darkGray">Join LinkedIn</h2>
          <p className="mt-2 text-linkedin-gray">Make the most of your professional life</p>
        </div>

        <div className="card p-8">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2">
              <AlertCircle className="w-5 h-5 text-red-500" />
              <span className="text-red-700 text-sm">{error}</span>
            </div>
          )}

          {success && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-green-700 text-sm">{success}</span>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-linkedin-darkGray mb-2">
                  First name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-linkedin-gray w-5 h-5" />
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    className="input-field pl-10"
                    placeholder="First name"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-linkedin-darkGray mb-2">
                  Last name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-linkedin-gray w-5 h-5" />
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    className="input-field pl-10"
                    placeholder="Last name"
                  />
                </div>
              </div>
            </div>

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
                  value={formData.email}
                  onChange={handleChange}
                  className="input-field pl-10"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-linkedin-darkGray mb-2">
                Phone number (optional)
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-linkedin-gray w-5 h-5" />
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  className="input-field pl-10"
                  placeholder="Enter your phone number"
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
                  value={formData.password}
                  onChange={handleChange}
                  className="input-field pl-10 pr-10"
                  placeholder="Create a password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-linkedin-gray hover:text-linkedin-darkGray"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              <p className="text-xs text-linkedin-gray mt-1">Must be at least 6 characters</p>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-linkedin-darkGray mb-2">
                Confirm password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-linkedin-gray w-5 h-5" />
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="input-field pl-10 pr-10"
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-linkedin-gray hover:text-linkedin-darkGray"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="agree-terms"
                name="agree-terms"
                type="checkbox"
                required
                className="h-4 w-4 text-linkedin-blue focus:ring-linkedin-blue border-linkedin-border rounded"
              />
              <label htmlFor="agree-terms" className="ml-2 block text-sm text-linkedin-gray">
                I agree to the{' '}
                <button type="button" className="text-linkedin-blue hover:underline">User Agreement</button>
                ,{' '}
                <button type="button" className="text-linkedin-blue hover:underline">Privacy Policy</button>
                , and{' '}
                <button type="button" className="text-linkedin-blue hover:underline">Cookie Policy</button>
                .
              </label>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full btn-primary py-3 text-base font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Creating account...' : 'Join LinkedIn'}
              </button>
            </div>

            <div className="text-center">
              <p className="text-sm text-linkedin-gray">
                Already on LinkedIn?{' '}
                <Link to="/login" className="text-linkedin-blue hover:text-linkedin-darkBlue font-medium">
                  Sign in
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register; 