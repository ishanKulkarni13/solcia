import { motion } from 'motion/react';
import { Music, Palette, BookOpen, Flower, Users, Heart } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';

interface DepressionSupportProps {
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

export default function DepressionSupport({ onNavigate, onLogout }: DepressionSupportProps) {
  const communities = [
    {
      icon: Music,
      title: 'Music Lovers',
      description: 'Share your favorite songs and discover healing melodies together',
      members: '2.4k members',
      gradient: 'from-pink-400 to-rose-400',
    },
    {
      icon: Palette,
      title: 'Art & Creativity',
      description: 'Express yourself through art and connect with creative souls',
      members: '1.8k members',
      gradient: 'from-purple-400 to-indigo-400',
    },
    {
      icon: BookOpen,
      title: 'Book Club',
      description: 'Find solace in stories and discuss meaningful literature',
      members: '3.1k members',
      gradient: 'from-blue-400 to-cyan-400',
    },
    {
      icon: Flower,
      title: 'Gardening & Nature',
      description: 'Connect with nature and grow beautiful things together',
      members: '1.5k members',
      gradient: 'from-green-400 to-emerald-400',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-purple-50">
      <Navbar onNavigate={onNavigate} onLogout={onLogout} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <motion.div
            animate={{
              rotate: [0, 10, -10, 0],
            }}
            transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
            className="inline-block mb-6"
          >
            <Heart className="w-16 h-16 text-blue-500 mx-auto" fill="currentColor" />
          </motion.div>
          <h1 className="text-gray-800 mb-4" style={{ fontSize: '2.5rem' }}>
            Depression Support
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto mb-4" style={{ fontSize: '1.125rem' }}>
            Rediscover Joy Through Shared Passions
          </p>
          <p className="text-gray-600 max-w-3xl mx-auto">
            You are not alone. Join supportive communities built around hobbies and interests that bring light back into life.
          </p>
        </motion.div>

        {/* Community Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {communities.map((community, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              whileHover={{ 
                y: -10,
                boxShadow: '0 25px 50px rgba(0,0,0,0.15)',
              }}
              className="bg-white rounded-3xl shadow-lg overflow-hidden group cursor-pointer"
            >
              {/* Icon Header */}
              <div className={`bg-gradient-to-r ${community.gradient} p-8 flex justify-center`}>
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg"
                >
                  <community.icon className="w-10 h-10 text-gray-700" />
                </motion.div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-gray-800 mb-2">{community.title}</h3>
                <p className="text-gray-600 mb-4">{community.description}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-gray-500">
                    <Users className="w-4 h-4" />
                    <span className="text-sm">{community.members}</span>
                  </div>
                  
                  <motion.button
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: '0 0 20px rgba(139, 92, 246, 0.4)',
                    }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-6 py-2 rounded-full bg-gradient-to-r ${community.gradient} text-white shadow-md`}
                  >
                    Join Group
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Support Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-center py-12"
        >
          <div className="max-w-4xl mx-auto bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 rounded-3xl p-8 md:p-12 shadow-lg">
            <h2 className="text-gray-800 mb-4" style={{ fontSize: '1.75rem' }}>
              You Are Valued and Important
            </h2>
            <p className="text-gray-700 mb-6" style={{ fontSize: '1.125rem' }}>
              Depression can feel isolating, but remember that brighter days are ahead. These communities are here to support you, celebrate your interests, and remind you that joy is still possible.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
              >
                Talk to Someone Now
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onNavigate('clinical')}
                className="px-6 py-3 rounded-full bg-white text-gray-700 shadow-lg border-2 border-purple-300 hover:border-purple-500"
              >
                Find a Therapist
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Encouraging Quote */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="text-center py-8"
        >
          <p className="text-gray-700 italic max-w-2xl mx-auto" style={{ fontSize: '1.125rem' }}>
            "Even the darkest night will end and the sun will rise."
          </p>
          <p className="text-gray-500 mt-2">— Victor Hugo</p>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
