import { motion } from 'motion/react';
import { useState } from 'react';
import { Mic, MessageCircle, Send, Users } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';

interface AITherapyProps {
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

export default function AITherapy({ onNavigate, onLogout }: AITherapyProps) {
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState<Array<{ type: 'user' | 'ai'; text: string }>>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const aiResponses = [
    "I hear you, and your feelings are valid. Can you tell me more about what's been on your mind?",
    "It sounds like you're going through a challenging time. Remember, it's okay to feel this way.",
    "Thank you for sharing that with me. What do you think would help you feel better right now?",
    "I'm here to support you. Have you considered talking to someone in your support network?",
    "Your mental health matters. Would you like some coping strategies for what you're experiencing?",
  ];

  const handleSend = () => {
    if (!inputText.trim()) return;

    setMessages([...messages, { type: 'user', text: inputText }]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];
      setMessages((prev) => [...prev, { type: 'ai', text: randomResponse }]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <Navbar onNavigate={onNavigate} onLogout={onLogout} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-gray-800 mb-4" style={{ fontSize: '2.5rem' }}>
            Evidence-Based AI Therapy
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Share your thoughts and feelings in a safe, judgment-free space. Our AI uses evidence-based therapeutic techniques to support you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Chat Interface */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-3xl shadow-xl overflow-hidden"
            >
              {/* Chat Header */}
              <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-6 text-white">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <h3>SoulSync AI Therapist</h3>
                    <p className="text-sm text-white/80">Always here to listen</p>
                  </div>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="h-96 overflow-y-auto p-6 space-y-4">
                {messages.length === 0 && (
                  <div className="text-center text-gray-400 mt-20">
                    <MessageCircle className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p>Start by sharing how you're feeling today...</p>
                  </div>
                )}

                {messages.map((message, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-md px-4 py-3 rounded-2xl ${
                        message.type === 'user'
                          ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {message.text}
                    </div>
                  </motion.div>
                ))}

                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                  >
                    <div className="bg-gray-100 px-4 py-3 rounded-2xl">
                      <div className="flex gap-1">
                        <motion.div
                          animate={{ y: [0, -5, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity }}
                          className="w-2 h-2 bg-gray-400 rounded-full"
                        />
                        <motion.div
                          animate={{ y: [0, -5, 0] }}
                          transition={{ duration: 0.6, delay: 0.2, repeat: Infinity }}
                          className="w-2 h-2 bg-gray-400 rounded-full"
                        />
                        <motion.div
                          animate={{ y: [0, -5, 0] }}
                          transition={{ duration: 0.6, delay: 0.4, repeat: Infinity }}
                          className="w-2 h-2 bg-gray-400 rounded-full"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Input Area */}
              <div className="border-t border-gray-200 p-4">
                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsRecording(!isRecording)}
                    className={`p-3 rounded-full transition-all ${
                      isRecording
                        ? 'bg-red-500 text-white animate-pulse'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                    }`}
                  >
                    <Mic className="w-5 h-5" />
                  </motion.button>
                  
                  <input
                    type="text"
                    placeholder="How are you feeling today?"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="flex-1 px-4 py-3 rounded-full border-2 border-gray-200 focus:border-purple-400 focus:outline-none"
                  />
                  
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSend}
                    className="p-3 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white"
                  >
                    <Send className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Side Panel */}
          <div className="space-y-6">
            {/* Voice Recording Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-purple-100 rounded-full">
                  <Mic className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-gray-800">Voice Support</h3>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                Click the microphone to share your feelings through voice. Sometimes it's easier to speak than type.
              </p>
              {isRecording && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700">
                  🔴 Recording... Speak freely
                </div>
              )}
            </motion.div>

            {/* Connect with Community */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-purple-100 to-indigo-100 rounded-2xl shadow-lg p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-white rounded-full">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-gray-800">Peer Support</h3>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                Connect with others who understand what you're going through.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onNavigate('depression')}
                className="w-full py-2 rounded-full bg-white text-purple-600 shadow-md hover:shadow-lg"
              >
                Join Community
              </motion.button>
            </motion.div>

            {/* Professional Help */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <h3 className="text-gray-800 mb-3">Need More Support?</h3>
              <p className="text-gray-600 text-sm mb-4">
                Connect with licensed therapists for professional care.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onNavigate('clinical')}
                className="w-full py-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md"
              >
                Find a Therapist
              </motion.button>
            </motion.div>
          </div>
        </div>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center text-gray-500 text-sm max-w-3xl mx-auto"
        >
          <p>
            This AI is designed to provide supportive conversation and coping strategies. It is not a replacement for professional mental health care. If you're in crisis, please contact emergency services or a crisis hotline immediately.
          </p>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
