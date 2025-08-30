import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-accent-50 dark:from-primary-950 dark:to-primary-900 flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent-600 to-accent-800 dark:from-accent-700 dark:to-accent-900">
          <div className="absolute inset-0 bg-black opacity-20"></div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 flex flex-col justify-center px-12 text-white"
        >
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">
              Sales Booking Tool
            </h1>
            <p className="text-xl text-accent-100 leading-relaxed">
              Streamline your sales process with our comprehensive CRM solution. 
              Manage leads, close deals, and grow your business faster.
            </p>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-4">
                <span className="text-lg">✓</span>
              </div>
              <span className="text-accent-100">Lead Management & Scoring</span>
            </div>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-4">
                <span className="text-lg">✓</span>
              </div>
              <span className="text-accent-100">Smart Calendar Integration</span>
            </div>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-4">
                <span className="text-lg">✓</span>
              </div>
              <span className="text-accent-100">Real-time Analytics</span>
            </div>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-4">
                <span className="text-lg">✓</span>
              </div>
              <span className="text-accent-100">Team Collaboration Tools</span>
            </div>
          </div>
        </motion.div>

        {/* Decorative Elements */}
        <div className="absolute top-20 right-20 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-accent-300/30 rounded-full blur-lg"></div>
      </div>

      {/* Right Side - Auth Form */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full max-w-md"
        >
          <div className="bg-white dark:bg-primary-900 shadow-2xl rounded-2xl px-8 py-12">
            <Outlet />
          </div>
          
          {/* Footer */}
          <p className="mt-8 text-center text-sm text-primary-600 dark:text-primary-400">
            © 2024 Sales Booking Tool. All rights reserved.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default AuthLayout;