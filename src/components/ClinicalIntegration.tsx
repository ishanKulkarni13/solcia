import { motion } from 'motion/react';
import { Calendar, MapPin, Video, Phone, Star } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import Navbar from './Navbar';
import Footer from './Footer';

interface ClinicalIntegrationProps {
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

export default function ClinicalIntegration({ onNavigate, onLogout }: ClinicalIntegrationProps) {
  const therapists = [
    {
      name: 'Dr. Sarah Johnson',
      specialty: 'Anxiety & Depression',
      experience: '12 years',
      rating: 4.9,
      reviews: 156,
      image: 'https://images.unsplash.com/photo-1733685318562-c726472bc1db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0aGVyYXBpc3QlMjBwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjAwODYxNjJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      availability: 'Available Today',
      online: true,
    },
    {
      name: 'Dr. Michael Chen',
      specialty: 'Trauma & PTSD',
      experience: '15 years',
      rating: 4.8,
      reviews: 203,
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop',
      availability: 'Next Available: Tomorrow',
      online: true,
    },
    {
      name: 'Dr. Emily Rodriguez',
      specialty: 'Relationship & Family',
      experience: '10 years',
      rating: 4.9,
      reviews: 189,
      image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop',
      availability: 'Available Today',
      online: false,
    },
    {
      name: 'Dr. James Williams',
      specialty: 'Stress & Burnout',
      experience: '8 years',
      rating: 4.7,
      reviews: 142,
      image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop',
      availability: 'Next Available: Friday',
      online: true,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50">
      <Navbar onNavigate={onNavigate} onLogout={onLogout} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-gray-800 mb-4" style={{ fontSize: '2.5rem' }}>
            Clinical Integration
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Connect with licensed therapists and mental health professionals. Your journey to wellness deserves professional support.
          </p>
        </motion.div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
            className="bg-white rounded-2xl shadow-lg p-8 cursor-pointer"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-4 bg-purple-100 rounded-full">
                <Video className="w-8 h-8 text-purple-600" />
              </div>
              <div>
                <h3 className="text-gray-800">Online Sessions</h3>
                <p className="text-gray-500 text-sm">Meet from anywhere, anytime</p>
              </div>
            </div>
            <p className="text-gray-600 mb-4">
              Book a video therapy session with licensed professionals from the comfort of your home.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md"
            >
              Book Online Session
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
            className="bg-white rounded-2xl shadow-lg p-8 cursor-pointer"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-4 bg-rose-100 rounded-full">
                <MapPin className="w-8 h-8 text-rose-600" />
              </div>
              <div>
                <h3 className="text-gray-800">Nearby Clinics</h3>
                <p className="text-gray-500 text-sm">In-person care near you</p>
              </div>
            </div>
            <p className="text-gray-600 mb-4">
              Find mental health clinics and therapists in your local area for face-to-face sessions.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-md"
            >
              Find Nearby Clinic
            </motion.button>
          </motion.div>
        </div>

        {/* Therapist Cards */}
        <div>
          <h2 className="text-gray-800 mb-8 text-center" style={{ fontSize: '2rem' }}>
            Featured Therapists
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {therapists.map((therapist, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8, boxShadow: '0 25px 50px rgba(0,0,0,0.15)' }}
                className="bg-white rounded-3xl shadow-xl overflow-hidden"
              >
                <div className="p-6">
                  {/* Profile */}
                  <div className="flex gap-4 mb-4">
                    <div className="w-24 h-24 rounded-full overflow-hidden flex-shrink-0">
                      <ImageWithFallback
                        src={therapist.image}
                        alt={therapist.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-gray-800 mb-1">{therapist.name}</h3>
                      <p className="text-purple-600 text-sm mb-2">{therapist.specialty}</p>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(therapist.rating)
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-600">
                          {therapist.rating} ({therapist.reviews} reviews)
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">{therapist.experience} experience</p>
                    </div>
                  </div>

                  {/* Availability */}
                  <div className="flex items-center gap-2 mb-4 p-3 bg-gray-50 rounded-lg">
                    <Calendar className="w-4 h-4 text-gray-600" />
                    <span className="text-sm text-gray-700">{therapist.availability}</span>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    {therapist.online && (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-1 py-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md flex items-center justify-center gap-2"
                      >
                        <Video className="w-4 h-4" />
                        <span className="text-sm">Book Online</span>
                      </motion.button>
                    )}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 py-2 rounded-full bg-white border-2 border-purple-300 text-purple-600 flex items-center justify-center gap-2"
                    >
                      <Phone className="w-4 h-4" />
                      <span className="text-sm">Contact</span>
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Info Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12 text-center"
        >
          <div className="max-w-3xl mx-auto bg-gradient-to-r from-purple-100 via-pink-100 to-rose-100 rounded-3xl p-8 shadow-lg">
            <h3 className="text-gray-800 mb-4">Why Professional Help Matters</h3>
            <p className="text-gray-700 mb-4">
              While AI and peer support are valuable, licensed therapists provide evidence-based treatment tailored to your unique needs. They can diagnose conditions, prescribe medication when needed, and offer specialized therapeutic approaches.
            </p>
            <p className="text-gray-600 text-sm">
              All therapists listed are licensed professionals verified by SoulSync. Your sessions are confidential and HIPAA-compliant.
            </p>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
