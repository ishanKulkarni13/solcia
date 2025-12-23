import { motion } from 'motion/react';
import { Heart, Menu, X, LogOut } from 'lucide-react';
import { useState } from 'react';

interface NavbarProps {
  onNavigate: (page: string) => void;
  onLogout?: () => void;
}

export default function Navbar({ onNavigate, onLogout }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Dashboard', page: 'dashboard' },
    { label: 'Stress Management', page: 'stress' },
    { label: 'Depression Support', page: 'depression' },
    { label: 'Mood Tracking', page: 'mood' },
    { label: 'AI Therapy', page: 'ai-therapy' },
    { label: 'Clinical Integration', page: 'clinical' },
    { label: 'Inclusive Focus', page: 'inclusive' },
    { label: 'Meditation', page: 'meditation' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <button
            onClick={() => onNavigate('dashboard')}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <Heart className="w-8 h-8 text-purple-500" fill="currentColor" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600" style={{ fontSize: '1.5rem' }}>
              SoulSync
            </span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <motion.button
                key={link.page}
                whileHover={{ y: -2 }}
                onClick={() => {
                  onNavigate(link.page);
                  setIsMenuOpen(false);
                }}
                className="text-gray-700 hover:text-purple-600 transition-colors relative group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 group-hover:w-full transition-all duration-300"></span>
              </motion.button>
            ))}
            {onLogout && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onLogout}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-md hover:shadow-lg transition-all"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </motion.button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="lg:hidden bg-white/95 backdrop-blur-md border-t border-gray-200"
        >
          <div className="px-4 py-4 space-y-2">
            {navLinks.map((link) => (
              <button
                key={link.page}
                onClick={() => {
                  onNavigate(link.page);
                  setIsMenuOpen(false);
                }}
                className="block w-full text-left px-4 py-3 rounded-lg hover:bg-purple-50 text-gray-700 hover:text-purple-600 transition-colors"
              >
                {link.label}
              </button>
            ))}
            {onLogout && (
              <button
                onClick={() => {
                  onLogout();
                  setIsMenuOpen(false);
                }}
                className="flex items-center gap-2 w-full px-4 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 text-white"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            )}
          </div>
        </motion.div>
      )}
    </nav>
  );
}
