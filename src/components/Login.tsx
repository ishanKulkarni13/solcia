import { motion } from 'motion/react';
import { Heart, Mail, Lock } from 'lucide-react';
import { useState } from 'react';

interface LoginProps {
  onNavigate: (page: string) => void;
  onLogin: () => void;
}

export default function Login({ onNavigate, onLogin }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-purple-100 via-blue-100 to-green-100 flex items-center justify-center px-4">
      {/* Blurred Background */}
      <div className="absolute inset-0 backdrop-blur-sm bg-white/30"></div>

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 md:p-12">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
              className="p-4 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full"
            >
              <Heart className="w-12 h-12 text-white" fill="currentColor" />
            </motion.div>
          </div>

          <h2 className="text-center text-gray-800 mb-2" style={{ fontSize: '2rem' }}>Welcome Back</h2>
          <p className="text-center text-gray-600 mb-8">Sign in to continue your journey</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-full border-2 border-gray-200 focus:border-purple-400 focus:outline-none transition-colors bg-white/50"
                required
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-full border-2 border-gray-200 focus:border-purple-400 focus:outline-none transition-colors bg-white/50"
                required
              />
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02, boxShadow: '0 0 25px rgba(139, 92, 246, 0.5)' }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg hover:shadow-xl transition-all"
            >
              Sign In
            </motion.button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="text-gray-500 text-sm">or</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          {/* Sign Up Link */}
          <p className="text-center text-gray-600">
            Don't have an account?{' '}
            <button
              onClick={() => onNavigate('signup')}
              className="text-purple-600 hover:text-purple-700"
            >
              Sign up
            </button>
          </p>

          {/* Back to Home */}
          <button
            onClick={() => onNavigate('landing')}
            className="w-full mt-4 text-gray-500 hover:text-gray-700 text-sm"
          >
            ← Back to Home
          </button>
        </div>
      </motion.div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-40 h-40 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
    </div>
  );
}
