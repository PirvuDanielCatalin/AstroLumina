import React, { useState, useEffect } from 'react';
import { Star, Moon, Sun, Sparkles, Clock, MessageCircle, Earth } from 'lucide-react';
import { useLoading } from './contexts/LoadingContext';
import ScrollToTopButton from './components/ScrollToTopButton';
import { useTranslation } from 'react-i18next';

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { stopLoading } = useLoading();
  const { t } = useTranslation();

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      stopLoading();
    }, 2000); // Show loading animation for 2 seconds

    return () => clearTimeout(timer);
  }, [stopLoading]);

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-amber-50">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto px-6">
          <div className="relative flex items-center justify-between h-16">
            <div className="flex-1 flex items-center justify-between">
              <div className="flex-shrink-0">
                <a 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-xl font-bold text-white hover:text-yellow-200 transition-colors"
                >
                  AstroLumina
                </a>
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <a href="#services" className="text-white hover:text-yellow-200 px-3 py-2 rounded-md text-sm font-semibold transition-colors">{t('services')}</a>
                  <a href="#about" className="text-white hover:text-yellow-200 px-3 py-2 rounded-md text-sm font-semibold transition-colors">{t('about')}</a>
                  <a href="#contact" className="text-white hover:text-yellow-200 px-3 py-2 rounded-md text-sm font-semibold transition-colors">{t('contact')}</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Starry background */}
        <div className="absolute inset-0 stars">
          {/* Shooting stars */}
          <div className="shooting-star"></div>
          <div className="shooting-star"></div>
          <div className="shooting-star"></div>
          <div className="shooting-star"></div>
          <div className="shooting-star"></div>
          <div className="shooting-star"></div>
          <div className="shooting-star"></div>
          <div className="shooting-star"></div>
          <div className="shooting-star"></div>
          <div className="shooting-star"></div>
          
          {/* Subtle overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-6 py-32 text-center">
          <div className="mb-8 flex justify-center">
            <Star className="w-16 h-16 text-yellow-200" />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">
            AstroLumina
            <br />
            <span className="text-3xl md:text-5xl text-yellow-200">by Carmen Ilie</span>
          </h1>
          <p className="text-xl md:text-2xl text-yellow-100/90 mb-12 max-w-3xl mx-auto">
            {t('hero-presentation')}
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button 
              onClick={() => scrollToSection('services')}
              className="bg-yellow-400 text-slate-900 px-8 py-4 rounded-full font-semibold hover:bg-yellow-300 transition-all shadow-lg hover:shadow-yellow-400/25"
            >
              Explore Services
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="bg-transparent text-yellow-200 px-8 py-4 rounded-full font-semibold hover:bg-white/10 transition-all border-2 border-yellow-200 hover:border-yellow-100 shadow-lg"
            >
              Contact Me
            </button>
          </div>
        </div>

        {/* Gradient fade to content */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent"></div>
      </section>
      
      {/* Rest of the content */}
      <div className="bg-white">
        {/* Services Section */}
        <section id="services" className="py-20 bg-amber-50">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-amber-900 text-center mb-12">{t('services')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Earth className="w-8 h-8" />,
                  title: t('services-list.planet-positions'),
                  price: "Free",
                  description: "Deep dive into your natal chart revealing your life's purpose and potential.",
                  link: "/planet-positions"
                },
                {
                  icon: <Sun className="w-8 h-8" />,
                  title: t('services-list.astral-chart'),
                  price: "$50",
                  description: "Discover what the coming year holds for you based on your solar return chart.",
                },
                {
                  icon: <Sparkles className="w-8 h-8" />,
                  title: t('services-list.karmic-chart'),
                  price: "$60",
                  description: "Understanding the cosmic connection between you and your partner.",
                },
                {
                  icon: <Sparkles className="w-8 h-8" />,
                  title: t('services-list.relationship-chart'),
                  price: "$60",
                  description: "Understanding the cosmic connection between you and your partner.",
                },
                {
                  icon: <Sparkles className="w-8 h-8" />,
                  title: t('services-list.future-chart'),
                  price: "$60",
                  description: "Understanding the cosmic connection between you and your partner.",
                },
                {
                  icon: <Moon className="w-8 h-8" />,
                  title: t('services-list.consultations'),
                  price: "$50",
                  description: "Discover what the coming year holds for you based on your solar return chart.",
                },
              ].map((service, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <div className="text-amber-500 mb-4">{service.icon}</div>
                  <h3 className="text-xl font-bold text-amber-900 mb-2">{service.title}</h3>
                  <p className="text-amber-700">{service.description}</p>
                  {service.link && (
                    <a
                      href={service.link}
                      className="text-amber-500 hover:text-amber-700 transition-colors"
                    >
                      {t('learn-more')}
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-amber-900 text-center mb-12">Why Choose Us</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: <Clock className="w-8 h-8" />,
                  title: "Accurate Readings",
                  description: "Our expert astrologers provide accurate and insightful readings.",
                },
                {
                  icon: <MessageCircle className="w-8 h-8" />,
                  title: "Personalized Guidance",
                  description: "Get personalized guidance and advice tailored to your needs.",
                },
                {
                  icon: <Star className="w-8 h-8" />,
                  title: "Spiritual Growth",
                  description: "Achieve spiritual growth and self-awareness through our services.",
                },
                {
                  icon: <Sparkles className="w-8 h-8" />,
                  title: "Cosmic Connection",
                  description: "Understand the cosmic connection between you and the universe.",
                },
              ].map((feature, index) => (
                <div key={index} className="text-center">
                  <div className="text-amber-500 mb-4 flex justify-center">{feature.icon}</div>
                  <h3 className="text-lg font-semibold text-amber-900 mb-2">{feature.title}</h3>
                  <p className="text-amber-700">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 bg-amber-50">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-amber-900 text-center mb-12">{t('contact')}</h2>
            <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-amber-900 font-medium mb-2">Name</label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-2 rounded-md border border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-amber-900 font-medium mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-2 rounded-md border border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-amber-900 font-medium mb-2">Message</label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full px-4 py-2 rounded-md border border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    placeholder="Your message"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-amber-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-amber-400 transition-colors shadow-md"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="py-8 px-4 bg-amber-50 border-t border-amber-100">
        <div className="max-w-6xl mx-auto text-center text-amber-900">
          <p> 2024 AstroLumina by Carmen Ilie. All rights reserved.</p>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      <ScrollToTopButton />
    </div>
  );
}

export default App;
