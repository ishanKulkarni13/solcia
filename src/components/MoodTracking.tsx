import { motion } from 'motion/react';
import { useState } from 'react';
import { Smile, Meh, Frown, Heart, Zap, Cloud } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';

interface MoodTrackingProps {
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

export default function MoodTracking({ onNavigate, onLogout }: MoodTrackingProps) {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [moodScores, setMoodScores] = useState({
    happy: 0,
    calm: 0,
    energetic: 0,
    anxious: 0,
    sad: 0,
    tired: 0,
  });
  const [showResults, setShowResults] = useState(false);

  const moods = [
    { id: 'great', icon: Smile, label: 'Great', color: 'text-green-500', bg: 'bg-green-100' },
    { id: 'okay', icon: Meh, label: 'Okay', color: 'text-yellow-500', bg: 'bg-yellow-100' },
    { id: 'low', icon: Frown, label: 'Low', color: 'text-orange-500', bg: 'bg-orange-100' },
  ];

  const emotionSliders = [
    { key: 'happy', label: 'Happy', icon: Smile, color: 'bg-green-400' },
    { key: 'calm', label: 'Calm', icon: Cloud, color: 'bg-blue-400' },
    { key: 'energetic', label: 'Energetic', icon: Zap, color: 'bg-yellow-400' },
    { key: 'anxious', label: 'Anxious', icon: Heart, color: 'bg-purple-400' },
    { key: 'sad', label: 'Sad', icon: Frown, color: 'bg-indigo-400' },
    { key: 'tired', label: 'Tired', icon: Cloud, color: 'bg-gray-400' },
  ];

  const quotes = [
    { mood: 'great', text: 'Your positive energy is contagious! Keep shining!' },
    { mood: 'okay', text: 'Every day is a step forward. You are doing great!' },
    { mood: 'low', text: 'It is okay to not be okay. Reach out for support when you need it.' },
  ];

  const blogs = [
    { title: '5 Ways to Boost Your Mood Naturally', time: '5 min read' },
    { title: 'Understanding Your Emotions: A Guide', time: '8 min read' },
    { title: 'The Science of Happiness', time: '6 min read' },
  ];

  const handleAnalyze = () => {
    setShowResults(true);
  };

  const getAverageScore = () => {
    const total = Object.values(moodScores).reduce((a, b) => a + b, 0);
    return Math.round(total / Object.keys(moodScores).length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      <Navbar onNavigate={onNavigate} onLogout={onLogout} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-gray-800 mb-4" style={{ fontSize: '2.5rem' }}>
            Mood Tracking
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Track your emotional wellness journey with AI-powered insights
          </p>
        </motion.div>

        {/* Quick Mood Selection */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-12"
        >
          <h2 className="text-gray-800 mb-6 text-center" style={{ fontSize: '1.5rem' }}>
            How are you feeling today?
          </h2>
          <div className="flex justify-center gap-6 flex-wrap">
            {moods.map((mood) => (
              <motion.button
                key={mood.id}
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedMood(mood.id)}
                className={`flex flex-col items-center gap-3 p-6 rounded-2xl transition-all ${
                  selectedMood === mood.id
                    ? 'bg-white shadow-2xl ring-4 ring-purple-300'
                    : 'bg-white shadow-lg hover:shadow-xl'
                }`}
              >
                <div className={`p-4 rounded-full ${mood.bg}`}>
                  <mood.icon className={`w-12 h-12 ${mood.color}`} />
                </div>
                <span className="text-gray-700">{mood.label}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Detailed Emotion Sliders */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-3xl shadow-xl p-8 mb-12"
        >
          <h2 className="text-gray-800 mb-6" style={{ fontSize: '1.5rem' }}>
            Rate Your Emotions
          </h2>
          <div className="space-y-6">
            {emotionSliders.map((emotion) => (
              <div key={emotion.key}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <emotion.icon className="w-5 h-5 text-gray-600" />
                    <label className="text-gray-700">{emotion.label}</label>
                  </div>
                  <span className="text-gray-600">{moodScores[emotion.key as keyof typeof moodScores]}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={moodScores[emotion.key as keyof typeof moodScores]}
                  onChange={(e) =>
                    setMoodScores({ ...moodScores, [emotion.key]: parseInt(e.target.value) })
                  }
                  className="w-full h-2 rounded-full appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, rgb(147 51 234) 0%, rgb(147 51 234) ${
                      moodScores[emotion.key as keyof typeof moodScores]
                    }%, rgb(229 231 235) ${moodScores[emotion.key as keyof typeof moodScores]}%, rgb(229 231 235) 100%)`,
                  }}
                />
              </div>
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.02, boxShadow: '0 0 25px rgba(139, 92, 246, 0.5)' }}
            whileTap={{ scale: 0.98 }}
            onClick={handleAnalyze}
            className="w-full mt-8 py-4 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg"
          >
            Analyze My Mood
          </motion.button>
        </motion.div>

        {/* Results */}
        {showResults && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6 mb-12"
          >
            {/* Mood Score Circle */}
            <div className="bg-white rounded-3xl shadow-xl p-8 text-center">
              <h3 className="text-gray-800 mb-6" style={{ fontSize: '1.5rem' }}>
                Your Overall Wellness Score
              </h3>
              <div className="relative inline-flex items-center justify-center">
                <svg className="w-48 h-48 transform -rotate-90">
                  <circle
                    cx="96"
                    cy="96"
                    r="88"
                    stroke="#E5E7EB"
                    strokeWidth="12"
                    fill="none"
                  />
                  <motion.circle
                    cx="96"
                    cy="96"
                    r="88"
                    stroke="url(#gradient)"
                    strokeWidth="12"
                    fill="none"
                    strokeLinecap="round"
                    initial={{ strokeDasharray: '0 552' }}
                    animate={{ strokeDasharray: `${(getAverageScore() / 100) * 552} 552` }}
                    transition={{ duration: 2, ease: 'easeOut' }}
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#8B5CF6" />
                      <stop offset="100%" stopColor="#3B82F6" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute">
                  <span className="text-gray-800" style={{ fontSize: '3rem' }}>{getAverageScore()}%</span>
                </div>
              </div>
            </div>

            {/* Personalized Suggestions */}
            <div className="bg-white rounded-3xl shadow-xl p-8">
              <h3 className="text-gray-800 mb-6" style={{ fontSize: '1.5rem' }}>
                Personalized Suggestions to Improve Your Score
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Happy Score Suggestion */}
                {moodScores.happy < 60 && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-4 rounded-xl bg-green-50 border border-green-200"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-green-200 flex items-center justify-center flex-shrink-0">
                        <Smile className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <h4 className="text-green-800 mb-1">Boost Happiness</h4>
                        <p className="text-green-700 text-sm">
                          Try gratitude journaling or connecting with loved ones. Small acts of kindness also increase happiness.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Calm Score Suggestion */}
                {moodScores.calm < 60 && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="p-4 rounded-xl bg-blue-50 border border-blue-200"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-200 flex items-center justify-center flex-shrink-0">
                        <Cloud className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="text-blue-800 mb-1">Increase Calmness</h4>
                        <p className="text-blue-700 text-sm">
                          Practice deep breathing or try our meditation sessions. Limit caffeine and screen time before bed.
                        </p>
                        <button
                          onClick={() => onNavigate('meditation')}
                          className="text-blue-600 text-sm mt-2 hover:underline"
                        >
                          Try Meditation →
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Energy Score Suggestion */}
                {moodScores.energetic < 60 && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="p-4 rounded-xl bg-yellow-50 border border-yellow-200"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-yellow-200 flex items-center justify-center flex-shrink-0">
                        <Zap className="w-5 h-5 text-yellow-600" />
                      </div>
                      <div>
                        <h4 className="text-yellow-800 mb-1">Boost Energy</h4>
                        <p className="text-yellow-700 text-sm">
                          Get moving with light exercise, improve sleep quality, and stay hydrated throughout the day.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Anxiety Reduction Suggestion */}
                {moodScores.anxious > 40 && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="p-4 rounded-xl bg-purple-50 border border-purple-200"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-purple-200 flex items-center justify-center flex-shrink-0">
                        <Heart className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <h4 className="text-purple-800 mb-1">Reduce Anxiety</h4>
                        <p className="text-purple-700 text-sm">
                          Try our breathing exercises, limit worry time to 15 mins daily, and consider talking to a therapist.
                        </p>
                        <button
                          onClick={() => onNavigate('stress')}
                          className="text-purple-600 text-sm mt-2 hover:underline"
                        >
                          Stress Management Tools →
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Sadness Support Suggestion */}
                {moodScores.sad > 40 && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="p-4 rounded-xl bg-indigo-50 border border-indigo-200"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-indigo-200 flex items-center justify-center flex-shrink-0">
                        <Frown className="w-5 h-5 text-indigo-600" />
                      </div>
                      <div>
                        <h4 className="text-indigo-800 mb-1">Address Sadness</h4>
                        <p className="text-indigo-700 text-sm">
                          Connect with supportive communities, engage in activities you enjoy, or speak with a professional.
                        </p>
                        <button
                          onClick={() => onNavigate('depression')}
                          className="text-indigo-600 text-sm mt-2 hover:underline"
                        >
                          Find Support Communities →
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Fatigue Suggestion */}
                {moodScores.tired > 60 && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="p-4 rounded-xl bg-gray-50 border border-gray-200"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                        <Cloud className="w-5 h-5 text-gray-600" />
                      </div>
                      <div>
                        <h4 className="text-gray-800 mb-1">Combat Fatigue</h4>
                        <p className="text-gray-700 text-sm">
                          Prioritize 7-9 hours of sleep, take short breaks during the day, and consider a consistent sleep schedule.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* All Good Message */}
                {getAverageScore() >= 70 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="md:col-span-2 p-6 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 text-center"
                  >
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-200 mb-4">
                      <Smile className="w-8 h-8 text-green-600" />
                    </div>
                    <h4 className="text-green-800 mb-2">Great Job! You are Doing Well!</h4>
                    <p className="text-green-700">
                      Your wellness score is healthy. Keep up with your positive habits, maintain social connections, and continue prioritizing self-care.
                    </p>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Quote Based on Mood */}
            {selectedMood && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-gradient-to-r from-purple-100 via-blue-100 to-green-100 rounded-3xl p-8 shadow-lg text-center"
              >
                <p className="text-gray-700 italic" style={{ fontSize: '1.25rem' }}>
                  {quotes.find((q) => q.mood === selectedMood)?.text}
                </p>
              </motion.div>
            )}

            {/* Suggested Blogs */}
            <div className="bg-white rounded-3xl shadow-xl p-8">
              <h3 className="text-gray-800 mb-6" style={{ fontSize: '1.5rem' }}>
                Recommended Reading
              </h3>
              <div className="space-y-4">
                {blogs.map((blog, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ x: 5, backgroundColor: '#F3F4F6' }}
                    className="flex justify-between items-center p-4 rounded-xl border border-gray-200 cursor-pointer"
                  >
                    <span className="text-gray-700">{blog.title}</span>
                    <span className="text-gray-500 text-sm">{blog.time}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>

      <Footer />
    </div>
  );
}
