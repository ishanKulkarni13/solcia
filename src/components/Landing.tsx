import { motion } from 'motion/react';
import { Heart, Sparkles, Circle } from 'lucide-react';
import { useState, useEffect } from 'react';

interface LandingProps {
  onNavigate: (page: string) => void;
}

export default function Landing({ onNavigate }: LandingProps) {
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  const floatingShapes = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    Icon: i % 3 === 0 ? Heart : i % 3 === 1 ? Sparkles : Circle,
    delay: i * 0.5,
    duration: 10 + (i % 5),
    x: Math.random() * 100,
  }));

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-purple-200 via-blue-200 to-green-200">
      {/* Floating Background Shapes */}
      {floatingShapes.map((shape) => (
        <motion.div
          key={shape.id}
          className="absolute opacity-20"
          style={{ left: `${shape.x}%`, top: '-50px' }}
          animate={{
            y: [0, window.innerHeight + 100],
            rotate: [0, 360],
          }}
          transition={{
            duration: shape.duration,
            delay: shape.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          <shape.Icon className="w-8 h-8 text-purple-400" />
        </motion.div>
      ))}

      {/* Top Right Buttons */}
      <div className="absolute top-8 right-8 flex gap-4 z-10">
        <motion.button
          whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(167, 139, 250, 0.6)' }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onNavigate('login')}
          className="px-6 py-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-all shadow-lg"
        >
          Login
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(167, 139, 250, 0.6)' }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onNavigate('signup')}
          className="px-6 py-2 rounded-full bg-gradient-to-r from-purple-400 to-blue-400 text-white shadow-lg hover:from-purple-500 hover:to-blue-500 transition-all"
        >
          Sign Up
        </motion.button>
      </div>

      {/* Music Toggle */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsMusicPlaying(!isMusicPlaying)}
        className="absolute top-8 left-8 p-4 rounded-full bg-white/80 backdrop-blur-sm shadow-lg z-10"
      >
        {isMusicPlaying ? '🔊' : '🔇'}
      </motion.button>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="text-center"
        >
          {/* Logo */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="mb-8"
          >
            <div className="inline-block relative">
              <motion.div
                animate={{
                  boxShadow: [
                    '0 0 20px rgba(167, 139, 250, 0.3)',
                    '0 0 40px rgba(139, 92, 246, 0.5)',
                    '0 0 20px rgba(167, 139, 250, 0.3)',
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="rounded-full p-8 bg-white/90 backdrop-blur-sm"
              >
                <Heart className="w-20 h-20 text-purple-500" fill="currentColor" />
              </motion.div>
            </div>
          </motion.div>

          {/* Logo Text */}
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-blue-600 to-green-600"
            style={{ fontSize: '4rem', fontWeight: '700' }}
          >
            SoulSync
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="text-gray-700 mb-12 max-w-2xl mx-auto"
            style={{ fontSize: '1.25rem' }}
          >
            Reconnect with Your Mind, Body, and Soul.
          </motion.p>

          {/* Explore Button */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
            whileHover={{ 
              scale: 1.05,
              boxShadow: '0 0 30px rgba(139, 92, 246, 0.6)',
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onNavigate('signup')}
            className="px-10 py-4 rounded-full bg-gradient-to-r from-purple-500 via-blue-500 to-green-500 text-white shadow-2xl hover:shadow-purple-500/50 transition-all"
          >
            Explore Features
          </motion.button>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ 
            opacity: { delay: 2 },
            y: { duration: 1.5, repeat: Infinity }
          }}
          className="absolute bottom-12"
        >
          <div className="flex flex-col items-center gap-2 text-purple-600">
            <span className="text-sm">Discover Inner Peace</span>
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              ↓
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Gradient Orbs */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-green-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" style={{ animationDelay: '2s' }}></div>
    </div>
  );
}
