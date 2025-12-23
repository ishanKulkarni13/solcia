import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

interface StressManagementProps {
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

export default function StressManagement({ onNavigate, onLogout }: StressManagementProps) {
  const [isBreathing, setIsBreathing] = useState(false);
  const [breathPhase, setBreathPhase] = useState<'inhale' | 'exhale'>('inhale');
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  const quotes = [
    "Take a deep breath. You are doing better than you think.",
    "Peace comes from within. Do not seek it without.",
    "Every breath is a new beginning.",
    "You are stronger than your stress.",
    "Calm mind brings inner strength and self-confidence.",
  ];

  const exercises = [
    {
      title: '4-7-8 Breathing',
      description: 'Inhale for 4 seconds, hold for 7, exhale for 8. Repeat 4 times.',
      duration: '5 min',
    },
    {
      title: 'Progressive Muscle Relaxation',
      description: 'Tense and relax each muscle group from toes to head.',
      duration: '10 min',
    },
    {
      title: 'Guided Visualization',
      description: 'Imagine a peaceful place and engage all your senses.',
      duration: '8 min',
    },
    {
      title: 'Mindful Walking',
      description: 'Take a slow walk while focusing on each step and breath.',
      duration: '15 min',
    },
  ];

  useEffect(() => {
    if (isBreathing) {
      const interval = setInterval(() => {
        setBreathPhase((prev) => (prev === 'inhale' ? 'exhale' : 'inhale'));
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isBreathing]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuoteIndex((prev) => (prev + 1) % quotes.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <Navbar onNavigate={onNavigate} onLogout={onLogout} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-gray-800 mb-4" style={{ fontSize: '2.5rem' }}>
            Stress Management
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Take a moment to breathe and release the tension. You deserve peace.
          </p>
        </motion.div>

        {/* Breathing Circle */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center mb-16"
        >
          <div className="relative w-80 h-80 flex items-center justify-center mb-8">
            <motion.div
              animate={
                isBreathing
                  ? {
                      scale: breathPhase === 'inhale' ? 1.2 : 0.8,
                      opacity: breathPhase === 'inhale' ? 0.8 : 0.4,
                    }
                  : { scale: 1, opacity: 0.6 }
              }
              transition={{ duration: 4, ease: 'easeInOut' }}
              className="absolute w-64 h-64 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 blur-xl"
            />
            <motion.div
              animate={
                isBreathing
                  ? {
                      scale: breathPhase === 'inhale' ? 1 : 0.7,
                    }
                  : { scale: 0.85 }
              }
              transition={{ duration: 4, ease: 'easeInOut' }}
              className="relative z-10 w-48 h-48 rounded-full bg-white shadow-2xl flex items-center justify-center"
            >
              <span className="text-gray-700" style={{ fontSize: '1.5rem' }}>
                {isBreathing ? (breathPhase === 'inhale' ? 'Breathe In' : 'Breathe Out') : 'Ready'}
              </span>
            </motion.div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsBreathing(!isBreathing)}
            className="px-8 py-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
          >
            {isBreathing ? 'Stop' : 'Start Breathing Exercise'}
          </motion.button>
        </motion.div>

        {/* Daily Exercises */}
        <div className="mb-16">
          <h2 className="text-gray-800 mb-6 text-center" style={{ fontSize: '2rem' }}>
            Daily Stress Relief Exercises
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {exercises.map((exercise, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5, boxShadow: '0 15px 30px rgba(0,0,0,0.1)' }}
                className="bg-white rounded-2xl p-6 shadow-lg"
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-gray-800">{exercise.title}</h3>
                  <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-600 text-sm">
                    {exercise.duration}
                  </span>
                </div>
                <p className="text-gray-600">{exercise.description}</p>
                <motion.button
                  whileHover={{ x: 5 }}
                  className="mt-4 text-purple-600 flex items-center gap-2"
                >
                  <span>Try Now</span>
                  <span>→</span>
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Motivational Quote */}
        <motion.div
          key={currentQuoteIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 1 }}
          className="text-center py-12"
        >
          <div className="max-w-3xl mx-auto bg-gradient-to-r from-purple-100 via-pink-100 to-blue-100 rounded-3xl p-8 shadow-lg">
            <p className="text-gray-700 italic" style={{ fontSize: '1.25rem' }}>
              "{quotes[currentQuoteIndex]}"
            </p>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
