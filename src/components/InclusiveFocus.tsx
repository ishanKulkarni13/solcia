import { motion } from 'motion/react';
import { Heart, Users, Home, TreePine, Sparkles } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import Navbar from './Navbar';
import Footer from './Footer';

interface InclusiveFocusProps {
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

export default function InclusiveFocus({ onNavigate, onLogout }: InclusiveFocusProps) {
  const opportunities = [
    {
      icon: Home,
      title: 'Old Age Home Visits',
      description: 'Spend time with elderly individuals who would love your company. Share stories, play games, or simply listen.',
      impact: '500+ seniors served',
      volunteers: 234,
      image: 'https://images.unsplash.com/photo-1676629650907-d50f2f27db20?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjBzdXBwb3J0JTIwdG9nZXRoZXJ8ZW58MXx8fHwxNzYwMTY2OTI5fDA&ixlib=rb-4.1.0&q=80&w=1080',
      gradient: 'from-amber-400 to-orange-400',
    },
    {
      icon: Heart,
      title: 'Orphanage Support',
      description: 'Mentor children, help with homework, organize activities, and be a positive role model in their lives.',
      impact: '300+ children helped',
      volunteers: 189,
      image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&h=400&fit=crop',
      gradient: 'from-pink-400 to-rose-400',
    },
    {
      icon: TreePine,
      title: 'Community Garden',
      description: 'Join community gardening projects that promote mental wellness through connection with nature.',
      impact: '12 gardens created',
      volunteers: 156,
      image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=600&h=400&fit=crop',
      gradient: 'from-green-400 to-emerald-400',
    },
    {
      icon: Users,
      title: 'Peer Mentorship',
      description: 'Support others on their mental health journey by sharing your experiences and providing guidance.',
      impact: '800+ connections made',
      volunteers: 421,
      image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&h=400&fit=crop',
      gradient: 'from-blue-400 to-cyan-400',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
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
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-block mb-6"
          >
            <Sparkles className="w-16 h-16 text-orange-500 mx-auto" />
          </motion.div>
          <h1 className="text-gray-800 mb-4" style={{ fontSize: '2.5rem' }}>
            Inclusive Focus: Gap Filling
          </h1>
          <p className="text-gray-600 max-w-3xl mx-auto mb-4" style={{ fontSize: '1.125rem' }}>
            Bridge the Gap with Compassion
          </p>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Research shows that helping others improves our own mental health. Find purpose and connection through community volunteering.
          </p>
        </motion.div>

        {/* Impact Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          {[
            { label: 'Volunteers', value: '1,000+', icon: Users },
            { label: 'Lives Touched', value: '5,000+', icon: Heart },
            { label: 'Hours Donated', value: '12,000+', icon: Sparkles },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg p-6 text-center"
            >
              <stat.icon className="w-10 h-10 text-orange-500 mx-auto mb-3" />
              <div className="text-gray-800 mb-1" style={{ fontSize: '2rem' }}>{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Volunteering Opportunities */}
        <div className="space-y-8">
          {opportunities.map((opportunity, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ 
                y: -5,
                boxShadow: '0 25px 50px rgba(0,0,0,0.15)',
              }}
              className="bg-white rounded-3xl shadow-xl overflow-hidden"
            >
              <div className={`grid grid-cols-1 md:grid-cols-2 ${index % 2 === 1 ? 'md:grid-flow-dense' : ''}`}>
                {/* Image */}
                <div className={`relative h-64 md:h-auto ${index % 2 === 1 ? 'md:col-start-2' : ''}`}>
                  <ImageWithFallback
                    src={opportunity.image}
                    alt={opportunity.title}
                    className="w-full h-full object-cover"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-r ${opportunity.gradient} opacity-20`}></div>
                </div>

                {/* Content */}
                <div className="p-8 flex flex-col justify-center">
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`p-4 bg-gradient-to-r ${opportunity.gradient} rounded-2xl`}>
                      <opportunity.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-gray-800">{opportunity.title}</h3>
                  </div>

                  <p className="text-gray-600 mb-6">{opportunity.description}</p>

                  <div className="flex items-center gap-6 mb-6">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Heart className="w-5 h-5" />
                      <span className="text-sm">{opportunity.impact}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Users className="w-5 h-5" />
                      <span className="text-sm">{opportunity.volunteers} volunteers</span>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: '0 0 25px rgba(251, 146, 60, 0.5)',
                    }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-8 py-3 rounded-full bg-gradient-to-r ${opportunity.gradient} text-white shadow-lg`}
                  >
                    Connect & Share Kindness
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Inspirational Quote */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-16 text-center"
        >
          <div className="max-w-3xl mx-auto bg-gradient-to-r from-orange-100 via-amber-100 to-yellow-100 rounded-3xl p-8 shadow-lg">
            <p className="text-gray-700 italic mb-4" style={{ fontSize: '1.25rem' }}>
              "The best way to find yourself is to lose yourself in the service of others."
            </p>
            <p className="text-gray-600">— Mahatma Gandhi</p>
            <div className="mt-6 pt-6 border-t border-orange-200">
              <p className="text-gray-700">
                Volunteering not only helps those in need but also provides a sense of purpose, reduces stress, and improves overall mental well-being. When we give, we receive healing in return.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
