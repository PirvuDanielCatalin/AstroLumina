import React, { useState, useEffect } from 'react';
import { Star, Moon, Sun, Sparkles, Clock, MessageCircle, ChevronRight, Menu, X } from 'lucide-react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import Dashboard from './components/Dashboard';

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="min-h-screen bg-indigo-950 text-white">
      {/* Navigation Header */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-indigo-950/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'}`}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <Star className="w-6 h-6 text-amber-400" />
              <span className="text-xl font-bold">Celestial</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <button onClick={() => scrollToSection('home')} className="text-gray-300 hover:text-white transition-colors">Home</button>
              <button onClick={() => scrollToSection('services')} className="text-gray-300 hover:text-white transition-colors">Services</button>
              <button onClick={() => scrollToSection('contact')} className="text-gray-300 hover:text-white transition-colors">Contact</button>
              <button 
                onClick={() => navigate('/login')}
                className="text-gray-300 hover:text-white transition-colors"
              >
                Sign In
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          <div className={`md:hidden transition-all duration-300 ${isMobileMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`}>
            <div className="py-4 space-y-4">
              <button onClick={() => scrollToSection('home')} className="block w-full text-left px-4 py-2 text-gray-300 hover:text-white transition-colors">Home</button>
              <button onClick={() => scrollToSection('services')} className="block w-full text-left px-4 py-2 text-gray-300 hover:text-white transition-colors">Services</button>
              <button onClick={() => scrollToSection('contact')} className="block w-full text-left px-4 py-2 text-gray-300 hover:text-white transition-colors">Contact</button>
              <button 
                onClick={() => navigate('/login')}
                className="block w-full text-left px-4 py-2 text-gray-300 hover:text-white transition-colors"
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 z-0" 
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1475090169767-40ed8d18f67d")',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
          }}
        >
          <div className="absolute inset-0 bg-indigo-950/60"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="flex justify-center mb-6">
            <Star className="w-12 h-12 text-amber-400" />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-amber-200 to-purple-400 text-transparent bg-clip-text">
            Celestial Guidance
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8">
            Unlock the secrets of your destiny through the ancient wisdom of the stars
          </p>
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all">
            Begin Your Journey
          </button>
        </div>
      </header>

      {/* Services Section */}
      <section id="services" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Astrological Services
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Moon className="w-8 h-8" />,
                title: "Birth Chart Reading",
                price: "$149",
                description: "Deep dive into your natal chart revealing your life's purpose and potential.",
              },
              {
                icon: <Sun className="w-8 h-8" />,
                title: "Solar Return Reading",
                price: "$99",
                description: "Discover what the coming year holds for you based on your solar return chart.",
              },
              {
                icon: <Sparkles className="w-8 h-8" />,
                title: "Relationship Compatibility",
                price: "$199",
                description: "Understanding the cosmic connection between you and your partner.",
              },
            ].map((service, index) => (
              <div key={index} className="bg-indigo-900/50 rounded-2xl p-8 backdrop-blur-sm hover:transform hover:-translate-y-1 transition-all">
                <div className="text-purple-400 mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                <p className="text-gray-300 mb-4">{service.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-purple-400">{service.price}</span>
                  <button className="flex items-center gap-2 text-purple-400 hover:text-purple-300">
                    Book Now <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Begin Your Spiritual Journey Today
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Let the stars guide you towards your true path
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 px-8 py-4 rounded-full">
              <MessageCircle className="w-5 h-5" />
              Book Consultation
            </button>
            <button className="flex items-center gap-2 border border-purple-400 hover:bg-purple-400/10 px-8 py-4 rounded-full">
              <Clock className="w-5 h-5" />
              View Availability
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-indigo-800">
        <div className="max-w-6xl mx-auto text-center text-gray-400">
          <p> 2024 Celestial Guidance. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;