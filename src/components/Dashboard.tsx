import { motion } from 'motion/react';
import { Heart, Circle, Sparkles, Wind, Users, SmileIcon, BrainCircuit, Stethoscope, HandHeart, Waves } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';

interface DashboardProps {
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

export default function Dashboard({ onNavigate, onLogout }: DashboardProps) {
  const features = [
    {
      title: 'Stress Management',
      description: 'Guided breathing exercises and daily stress relief techniques',
      gradient: 'from-purple-400 to-pink-400',
      page: 'stress',
      icon: Wind,
    },
    {
      title: 'Depression Support',
      description: 'Connect with supportive communities and rediscover joy',
      gradient: 'from-blue-400 to-cyan-400',
      page: 'depression',
      icon: Users,
    },
    {
      title: 'Mood Tracking',
      description: 'Track your emotional wellness journey with AI insights',
      gradient: 'from-green-400 to-emerald-400',
      page: 'mood',
      icon: SmileIcon,
    },
    {
      title: 'AI Therapy',
      description: 'Evidence-based therapeutic support powered by AI',
      gradient: 'from-indigo-400 to-purple-400',
      page: 'ai-therapy',
      icon: BrainCircuit,
    },
    {
      title: 'Clinical Integration',
      description: 'Connect with licensed therapists and book sessions',
      gradient: 'from-pink-400 to-rose-400',
      page: 'clinical',
      icon: Stethoscope,
    },
    {
      title: 'Inclusive Focus',
      description: 'Bridge gaps through community volunteering and kindness',
      gradient: 'from-orange-400 to-amber-400',
      page: 'inclusive',
      icon: HandHeart,
    },
    {
      title: 'Meditation & Mindfulness',
      description: 'Guided meditation sessions for inner peace',
      gradient: 'from-teal-400 to-cyan-400',
      page: 'meditation',
      icon: Waves,
    },
  ];

  const floatingParticles = Array.from({ length: 10 }, (_, i) => ({
    id: i,
    Icon: i % 3 === 0 ? Heart : i % 3 === 1 ? Sparkles : Circle,
    delay: i * 0.3,
    duration: 8 + (i % 4),
    x: Math.random() * 100,
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-green-50 relative overflow-hidden">
      <Navbar onNavigate={onNavigate} onLogout={onLogout} />

      {/* Floating Particles */}
      {floatingParticles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute opacity-10 pointer-events-none"
          style={{ left: `${particle.x}%`, top: '-30px' }}
          animate={{
            y: [0, window.innerHeight + 50],
            rotate: [0, 360],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          <particle.Icon className="w-6 h-6 text-purple-400" />
        </motion.div>
      ))}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome Banner */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            animate={{
              boxShadow: [
                '0 0 20px rgba(167, 139, 250, 0.2)',
                '0 0 40px rgba(139, 92, 246, 0.3)',
                '0 0 20px rgba(167, 139, 250, 0.2)',
              ],
            }}
            transition={{ duration: 3, repeat: Infinity }}
            className="inline-block p-8 rounded-3xl bg-white/80 backdrop-blur-sm mb-6"
          >
            <Heart className="w-16 h-16 text-purple-500 mx-auto" fill="currentColor" />
          </motion.div>
          <h1 className="text-gray-800 mb-4" style={{ fontSize: '2.5rem' }}>
            Welcome to SoulSync
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto" style={{ fontSize: '1.125rem' }}>
            Your space of balance and healing. Explore our features to begin your wellness journey.
          </p>
        </motion.div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {features.map((feature, index) => (
            <motion.div
              key={feature.page}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
              onClick={() => onNavigate(feature.page)}
              className="cursor-pointer group"
            >
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden h-full transition-all">
                {/* Gradient Header */}
                <div className={`h-2 bg-gradient-to-r ${feature.gradient}`}></div>
                
                <div className="p-6">
                  {/* Icon */}
                  <motion.div
                    className={`mb-4 w-12 h-12 rounded-xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center`}
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <feature.icon className="w-6 h-6 text-white" />
                  </motion.div>

                  <h3 className="text-gray-800 mb-2 group-hover:text-purple-600 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                  
                  <motion.div
                    className="mt-4 text-purple-600 flex items-center gap-2"
                    whileHover={{ x: 5 }}
                  >
                    <span>Explore</span>
                    <span>→</span>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Inspirational Quote */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-center py-12"
        >
          <div className="max-w-3xl mx-auto bg-gradient-to-r from-purple-100 via-blue-100 to-green-100 rounded-3xl p-8 shadow-lg">
            <p className="text-gray-700 italic" style={{ fontSize: '1.25rem' }}>
              "In the midst of movement and chaos, keep stillness inside of you."
            </p>
            <p className="text-gray-500 mt-2">— Deepak Chopra</p>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
