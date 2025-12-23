import { motion } from 'motion/react';
import { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, SkipForward } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import Navbar from './Navbar';
import Footer from './Footer';

interface MeditationProps {
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

export default function Meditation({ onNavigate, onLogout }: MeditationProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [audioError, setAudioError] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  // Meditation audio tracks - Royalty-free meditation and ambient sounds
  const tracks = [
    { 
      title: 'Morning Focus', 
      duration: '10:00', 
      type: 'Focus',
      url: 'https://cdn.freesound.org/previews/567/567174_11861866-lq.mp3' // Tibetan singing bowl
    },
    { 
      title: 'Inner Peace', 
      duration: '15:00', 
      type: 'Peace',
      url: 'https://cdn.freesound.org/previews/221/221576_2394245-lq.mp3' // Peaceful ambient meditation
    },
    { 
      title: 'Gratitude Practice', 
      duration: '8:00', 
      type: 'Gratitude',
      url: 'https://cdn.freesound.org/previews/415/415209_6525331-lq.mp3' // Calm nature sounds
    },
    { 
      title: 'Stress Relief', 
      duration: '12:00', 
      type: 'Relief',
      url: 'https://cdn.freesound.org/previews/458/458130_7037732-lq.mp3' // Relaxing ambient drone
    },
    { 
      title: 'Sleep Meditation', 
      duration: '20:00', 
      type: 'Sleep',
      url: 'https://cdn.freesound.org/previews/419/419977_1474204-lq.mp3' // Deep relaxation tone
    },
    { 
      title: 'Body Scan', 
      duration: '18:00', 
      type: 'Relaxation',
      url: 'https://cdn.freesound.org/previews/364/364725_5121236-lq.mp3' // Gentle meditation bells
    },
  ];

  const quotes = [
    "The present moment is filled with joy and happiness. If you are attentive, you will see it.",
    "Meditation is not about stopping thoughts, but recognizing that we are more than our thoughts.",
    "Peace comes from within. Do not seek it without.",
    "In the midst of movement and chaos, keep stillness inside of you.",
    "The quieter you become, the more you can hear.",
    "Meditation is the tongue of the soul and the language of our spirit.",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuoteIndex((prev) => (prev + 1) % quotes.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // Generate calming tone using Web Audio API as fallback
  const generateCalmingTone = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    
    const audioContext = audioContextRef.current;
    
    // Stop existing oscillator if any
    if (oscillatorRef.current) {
      oscillatorRef.current.stop();
    }
    
    // Create oscillator for calming frequency (around 432Hz for relaxation)
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(432, audioContext.currentTime); // Relaxing frequency
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime); // Low volume
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.start();
    
    oscillatorRef.current = oscillator;
    gainNodeRef.current = gainNode;
  };

  const stopCalmingTone = () => {
    if (oscillatorRef.current) {
      oscillatorRef.current.stop();
      oscillatorRef.current = null;
    }
  };

  // Initialize audio element
  useEffect(() => {
    setIsLoading(true);
    setAudioError(false);
    
    const audio = new Audio(tracks[currentTrack].url);
    audio.loop = true;
    audio.crossOrigin = "anonymous";
    audioRef.current = audio;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => {
      setDuration(audio.duration);
      setIsLoading(false);
    };
    const handleError = () => {
      setAudioError(true);
      setIsLoading(false);
      console.log('Audio failed to load, using generated tone');
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('canplay', () => setIsLoading(false));
    audio.addEventListener('error', handleError);

    return () => {
      audio.pause();
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('canplay', () => setIsLoading(false));
      audio.removeEventListener('error', handleError);
      stopCalmingTone();
    };
  }, [currentTrack]);

  // Handle play/pause
  useEffect(() => {
    if (audioRef.current && !audioError) {
      if (isPlaying) {
        audioRef.current.play().catch(err => {
          console.log('Audio play failed, using generated tone:', err);
          setAudioError(true);
        });
      } else {
        audioRef.current.pause();
      }
    }
    
    // Use generated tone as fallback
    if (audioError) {
      if (isPlaying) {
        generateCalmingTone();
      } else {
        stopCalmingTone();
      }
    }
  }, [isPlaying, audioError]);

  // Handle mute/unmute
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
    }
  }, [isMuted]);

  const handlePrevTrack = () => {
    setIsPlaying(false);
    setCurrentTrack((prev) => (prev > 0 ? prev - 1 : tracks.length - 1));
    setCurrentTime(0);
  };

  const handleNextTrack = () => {
    setIsPlaying(false);
    setCurrentTrack((prev) => (prev + 1) % tracks.length);
    setCurrentTime(0);
  };

  const handleTrackSelect = (index: number) => {
    setCurrentTrack(index);
    setIsPlaying(true);
    setCurrentTime(0);
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50">
      <Navbar onNavigate={onNavigate} onLogout={onLogout} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-gray-800 mb-4" style={{ fontSize: '2.5rem' }}>
            Meditation & Mindfulness
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find your center through guided meditation and mindful breathing
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Player */}
          <div className="lg:col-span-2 space-y-8">
            {/* Audio Player Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-3xl shadow-2xl overflow-hidden"
            >
              {/* Cover Image with Wave Animation */}
              <div className="relative h-80 bg-gradient-to-br from-teal-400 via-cyan-400 to-blue-400 overflow-hidden">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1759754154962-f56bc4965843?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpdGF0aW9uJTIwcGVhY2VmdWwlMjBuYXR1cmV8ZW58MXx8fHwxNzYwMDc0MzM0fDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Meditation"
                  className="w-full h-full object-cover opacity-40"
                />
                
                {/* Loading Indicator */}
                {isLoading && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="w-12 h-12 border-4 border-white border-t-transparent rounded-full"
                    />
                  </div>
                )}

                {/* Animated Wave Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  {isPlaying && !isLoading && (
                    <div className="flex items-center gap-1">
                      {[...Array(20)].map((_, i) => (
                        <motion.div
                          key={i}
                          animate={{
                            height: [20, 60, 20],
                          }}
                          transition={{
                            duration: 1,
                            delay: i * 0.1,
                            repeat: Infinity,
                          }}
                          className="w-1 bg-white rounded-full"
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Track Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 to-transparent text-white">
                  <h3 style={{ fontSize: '1.5rem' }}>{tracks[currentTrack].title}</h3>
                  <p className="text-white/80">
                    {tracks[currentTrack].type} • {tracks[currentTrack].duration}
                    {audioError && <span className="ml-2 text-xs">(Calming Tone)</span>}
                  </p>
                </div>
              </div>

              {/* Player Controls */}
              <div className="p-6">
                <div className="flex items-center justify-center gap-6 mb-6">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handlePrevTrack}
                    className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                  >
                    <SkipForward className="w-5 h-5 text-gray-700 rotate-180" />
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="p-6 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 shadow-xl hover:shadow-2xl transition-all"
                  >
                    {isPlaying ? (
                      <Pause className="w-8 h-8 text-white" fill="currentColor" />
                    ) : (
                      <Play className="w-8 h-8 text-white" fill="currentColor" />
                    )}
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleNextTrack}
                    className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                  >
                    <SkipForward className="w-5 h-5 text-gray-700" />
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsMuted(!isMuted)}
                    className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                  >
                    {isMuted ? (
                      <VolumeX className="w-5 h-5 text-gray-700" />
                    ) : (
                      <Volume2 className="w-5 h-5 text-gray-700" />
                    )}
                  </motion.button>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-2">
                  <motion.div
                    className="h-full bg-gradient-to-r from-teal-500 to-cyan-500"
                    style={{ width: `${progressPercentage}%` }}
                    transition={{ duration: 0.1 }}
                  />
                </div>
                
                {/* Time Display */}
                <div className="flex justify-between text-sm text-gray-500">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>
            </motion.div>

            {/* Mindfulness Quote */}
            <motion.div
              key={currentQuoteIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 1 }}
              className="bg-gradient-to-r from-teal-100 via-cyan-100 to-blue-100 rounded-3xl p-8 shadow-lg text-center"
            >
              <p className="text-gray-700 italic" style={{ fontSize: '1.125rem' }}>
                "{quotes[currentQuoteIndex]}"
              </p>
            </motion.div>
          </div>

          {/* Playlist Sidebar */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-3xl shadow-xl p-6 sticky top-24"
            >
              <h3 className="text-gray-800 mb-6">Meditation Playlist</h3>
              <div className="space-y-3">
                {tracks.map((track, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ x: 5, backgroundColor: '#F3F4F6' }}
                    onClick={() => handleTrackSelect(index)}
                    className={`w-full text-left p-4 rounded-xl transition-all ${
                      currentTrack === index
                        ? 'bg-gradient-to-r from-teal-50 to-cyan-50 border-2 border-teal-300'
                        : 'bg-white border border-gray-200 hover:border-teal-300'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-gray-800">{track.title}</span>
                      {currentTrack === index && isPlaying && (
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 1, repeat: Infinity }}
                        >
                          <Play className="w-4 h-4 text-teal-600" fill="currentColor" />
                        </motion.div>
                      )}
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">{track.type}</span>
                      <span className="text-sm text-gray-400">{track.duration}</span>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {[
            {
              title: 'Reduce Stress',
              description: 'Lower cortisol levels and find calm in daily chaos',
              color: 'from-teal-400 to-cyan-400',
            },
            {
              title: 'Improve Focus',
              description: 'Enhance concentration and mental clarity',
              color: 'from-cyan-400 to-blue-400',
            },
            {
              title: 'Better Sleep',
              description: 'Relax your mind for deeper, more restful sleep',
              color: 'from-blue-400 to-indigo-400',
            },
          ].map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <div className={`w-12 h-12 bg-gradient-to-r ${benefit.color} rounded-full mb-4`}></div>
              <h4 className="text-gray-800 mb-2">{benefit.title}</h4>
              <p className="text-gray-600">{benefit.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
