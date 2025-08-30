import { useState } from 'react';
import { motion } from 'framer-motion';
import { UserIcon, CameraIcon } from '@heroicons/react/24/outline';
import { useAuthStore } from '@/stores/authStore';

const Profile = () => {
  const { user } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: '',
    jobTitle: '',
    company: '',
    bio: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-primary-900 dark:text-primary-100">
          Profile
        </h1>
        <p className="text-primary-600 dark:text-primary-400 mt-1">
          Manage your personal information and preferences
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Picture & Basic Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card p-6 text-center"
        >
          <div className="relative inline-block mb-4">
            <div className="w-24 h-24 bg-accent-500 rounded-full flex items-center justify-center mx-auto">
              {user?.avatar ? (
                <img 
                  src={user.avatar} 
                  alt="Profile" 
                  className="w-24 h-24 rounded-full object-cover"
                />
              ) : (
                <UserIcon className="w-12 h-12 text-white" />
              )}
            </div>
            <button className="absolute bottom-0 right-0 w-8 h-8 bg-white dark:bg-primary-800 rounded-full shadow-lg flex items-center justify-center border-2 border-primary-200 dark:border-primary-700">
              <CameraIcon className="w-4 h-4 text-primary-600 dark:text-primary-400" />
            </button>
          </div>
          
          <h2 className="text-xl font-semibold text-primary-900 dark:text-primary-100">
            {formData.firstName} {formData.lastName}
          </h2>
          <p className="text-primary-600 dark:text-primary-400 mb-4">
            {formData.email}
          </p>
          
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-primary-600 dark:text-primary-400">Role:</span>
              <span className="text-primary-900 dark:text-primary-100">{user?.role || 'Sales Rep'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-primary-600 dark:text-primary-400">Status:</span>
              <span className="text-success-600">Active</span>
            </div>
          </div>
        </motion.div>

        {/* Profile Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2 card p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-primary-900 dark:text-primary-100">
              Personal Information
            </h3>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className={isEditing ? 'btn-secondary' : 'btn-primary'}
            >
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="label">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="input"
                />
              </div>
              
              <div>
                <label htmlFor="lastName" className="label">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="input"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="label">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled={!isEditing}
                className="input"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="phone" className="label">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="input"
                />
              </div>
              
              <div>
                <label htmlFor="jobTitle" className="label">
                  Job Title
                </label>
                <input
                  type="text"
                  id="jobTitle"
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="input"
                />
              </div>
            </div>

            <div>
              <label htmlFor="company" className="label">
                Company
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                disabled={!isEditing}
                className="input"
              />
            </div>

            <div>
              <label htmlFor="bio" className="label">
                Bio
              </label>
              <textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                disabled={!isEditing}
                rows={4}
                className="input resize-none"
                placeholder="Tell us about yourself..."
              />
            </div>

            {isEditing && (
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Save Changes
                </button>
              </div>
            )}
          </form>
        </motion.div>
      </div>

      {/* Activity Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="card p-6"
      >
        <h3 className="text-lg font-semibold text-primary-900 dark:text-primary-100 mb-4">
          Activity Overview
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-primary-50 dark:bg-primary-800 rounded-lg">
            <div className="text-2xl font-bold text-accent-600">24</div>
            <div className="text-sm text-primary-600 dark:text-primary-400">Active Deals</div>
          </div>
          <div className="text-center p-4 bg-primary-50 dark:bg-primary-800 rounded-lg">
            <div className="text-2xl font-bold text-success-600">156</div>
            <div className="text-sm text-primary-600 dark:text-primary-400">Closed Deals</div>
          </div>
          <div className="text-center p-4 bg-primary-50 dark:bg-primary-800 rounded-lg">
            <div className="text-2xl font-bold text-warning-600">$2.4M</div>
            <div className="text-sm text-primary-600 dark:text-primary-400">Total Revenue</div>
          </div>
          <div className="text-center p-4 bg-primary-50 dark:bg-primary-800 rounded-lg">
            <div className="text-2xl font-bold text-error-600">89%</div>
            <div className="text-sm text-primary-600 dark:text-primary-400">Win Rate</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;