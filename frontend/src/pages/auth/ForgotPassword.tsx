import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useAuthStore } from '@/stores/authStore';
import toast from 'react-hot-toast';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { forgotPassword } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }

    setIsLoading(true);
    try {
      await forgotPassword(email);
      setIsSubmitted(true);
      toast.success('Password reset link sent to your email');
    } catch (error: any) {
      toast.error(error.message || 'Failed to send reset link');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full space-y-8 text-center"
      >
        <div>
          <h2 className="text-3xl font-bold text-primary-900 dark:text-primary-100">
            Check your email
          </h2>
          <p className="mt-4 text-primary-600 dark:text-primary-400">
            We've sent a password reset link to <strong>{email}</strong>
          </p>
          <p className="mt-2 text-sm text-primary-500 dark:text-primary-500">
            Didn't receive the email? Check your spam folder or try again.
          </p>
        </div>
        
        <div className="space-y-4">
          <button
            onClick={() => setIsSubmitted(false)}
            className="btn-secondary w-full"
          >
            Try different email
          </button>
          
          <Link to="/auth/login" className="btn-ghost w-full">
            <ArrowLeftIcon className="w-4 h-4 mr-2" />
            Back to sign in
          </Link>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md w-full space-y-8"
    >
      <div>
        <h2 className="text-center text-3xl font-bold text-primary-900 dark:text-primary-100">
          Forgot your password?
        </h2>
        <p className="mt-2 text-center text-sm text-primary-600 dark:text-primary-400">
          Enter your email address and we'll send you a link to reset your password.
        </p>
      </div>
      
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email" className="label">
            Email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="input"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <button
            type="submit"
            disabled={isLoading}
            className="btn-primary w-full"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="spinner w-5 h-5 mr-2"></div>
                Sending...
              </div>
            ) : (
              'Send reset link'
            )}
          </button>
        </div>
        
        <div className="text-center">
          <Link
            to="/auth/login"
            className="inline-flex items-center text-sm font-medium text-accent-600 hover:text-accent-500 transition-colors"
          >
            <ArrowLeftIcon className="w-4 h-4 mr-2" />
            Back to sign in
          </Link>
        </div>
      </form>
    </motion.div>
  );
};

export default ForgotPassword;