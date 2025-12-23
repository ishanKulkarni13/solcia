import { useState } from 'react';
import Landing from './components/Landing';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import StressManagement from './components/StressManagement';
import DepressionSupport from './components/DepressionSupport';
import MoodTracking from './components/MoodTracking';
import AITherapy from './components/AITherapy';
import ClinicalIntegration from './components/ClinicalIntegration';
import InclusiveFocus from './components/InclusiveFocus';
import Meditation from './components/Meditation';
import ChatbotWidget from './components/ChatbotWidget';

export default function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = (page: string) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    navigate('dashboard');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate('landing');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'landing':
        return <Landing onNavigate={navigate} />;
      case 'login':
        return <Login onNavigate={navigate} onLogin={handleLogin} />;
      case 'signup':
        return <Signup onNavigate={navigate} onLogin={handleLogin} />;
      case 'dashboard':
        return <Dashboard onNavigate={navigate} onLogout={handleLogout} />;
      case 'stress':
        return <StressManagement onNavigate={navigate} onLogout={handleLogout} />;
      case 'depression':
        return <DepressionSupport onNavigate={navigate} onLogout={handleLogout} />;
      case 'mood':
        return <MoodTracking onNavigate={navigate} onLogout={handleLogout} />;
      case 'ai-therapy':
        return <AITherapy onNavigate={navigate} onLogout={handleLogout} />;
      case 'clinical':
        return <ClinicalIntegration onNavigate={navigate} onLogout={handleLogout} />;
      case 'inclusive':
        return <InclusiveFocus onNavigate={navigate} onLogout={handleLogout} />;
      case 'meditation':
        return <Meditation onNavigate={navigate} onLogout={handleLogout} />;
      default:
        return <Landing onNavigate={navigate} />;
    }
  };

  return (
    <div className="min-h-screen">
      {renderPage()}
      {isLoggedIn && <ChatbotWidget />}
    </div>
  );
}
