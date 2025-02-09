import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Navbar from './components/navbar/Navbar';
import ScrollToTopButton from './components/scroll/ScrollToTopButton';
import { useLoading } from './contexts/LoadingContext';
import { Star, Sparkles, Clock, MessageCircle } from 'lucide-react';

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { startLoading, stopLoading } = useLoading();
  const { t } = useTranslation();

  useEffect(() => {
    startLoading();
    const timer = setTimeout(() => {
      stopLoading();
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

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
      const offset = 80; // pentru a compensa navbar-ul fix
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-amber-50">
      <Navbar isScrolled={isScrolled} />
      
      <main className="relative">
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
          <section id="services" className="py-20 bg-gradient-to-br from-amber-50 to-amber-100">
            <div className="container mx-auto px-6">
              <h2 className="text-3xl md:text-4xl font-bold text-amber-900 text-center mb-12">{t('services')}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    title: "Poziția Planetelor",
                    description: "Află pozițiile exacte ale planetelor în timp real și interpretarea influențelor astrologice curente.",
                    icon: (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    ),
                    link: "/services/planet-positions"
                  },
                  {
                    title: "Hartă Natală",
                    description: "Descoperă-ți potențialul și provocările prin analiza detaliată a hărții tale astrologice de naștere.",
                    icon: (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                      </svg>
                    ),
                    link: "/services/natal-chart"
                  },
                  {
                    title: "Previziuni și Tranzituri",
                    description: "Explorează influențele astrologice viitoare și pregătește-te pentru oportunitățile ce urmează.",
                    icon: (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    ),
                    link: "/services/transit-forecast"
                  },
                  {
                    title: "Sinastrie",
                    description: "Analizează compatibilitatea și dinamica relațiilor prin compararea hărților astrologice.",
                    icon: (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    ),
                    link: "/services/relationship-synastry"
                  },
                  {
                    title: "Ghidare în Carieră",
                    description: "Descoperă-ți potențialul profesional și direcția optimă de carieră prin astrologie.",
                    icon: (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    ),
                    link: "/services/career-guidance"
                  },
                  {
                    title: "Astrologie Elecțională",
                    description: "Identifică momentul perfect pentru a începe proiecte importante și a lua decizii majore.",
                    icon: (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    ),
                    link: "/services/electional-astrology"
                  }
                ].map((service, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-lg p-6 transform hover:scale-105 transition-transform duration-200">
                    <div className="text-amber-500 mb-4">
                      {service.icon}
                    </div>
                    <h3 className="text-xl font-bold text-amber-900 mb-2">{service.title}</h3>
                    <p className="text-amber-700 mb-4">{service.description}</p>
                    <Link
                      to={service.link}
                      className="text-amber-500 hover:text-amber-700 transition-colors"
                    >
                      {t('learn-more')}
                    </Link>
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
          <section id="contact" className="py-16 bg-gradient-to-br from-amber-50 to-amber-100">
            <div className="max-w-4xl mx-auto px-6">
              <h2 className="text-4xl font-bold text-center text-amber-800 mb-12">Contact</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Contact Info */}
                <div className="space-y-6">
                  <div className="text-center md:text-left">
                    <h3 className="text-2xl font-semibold text-amber-700 mb-8">Date de Contact</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-center md:justify-start space-x-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <a href="mailto:contact@astrolumina.ro" className="text-amber-700 hover:text-amber-500 transition-colors">
                          contact@astrolumina.ro
                        </a>
                      </div>
                      <div className="flex items-center justify-center md:justify-start space-x-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <a href="tel:+40123456789" className="text-amber-700 hover:text-amber-500 transition-colors">
                          +40 123 456 789
                        </a>
                      </div>
                      <div className="flex items-center justify-center md:justify-start space-x-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-amber-700">
                          Program: Luni - Vineri, 10:00 - 18:00
                        </span>
                      </div>
                      <div className="flex items-center justify-center md:justify-start space-x-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="text-amber-700">
                          București, România
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Contact Message */}
                <div className="text-center md:text-left">
                  <h3 className="text-2xl font-semibold text-amber-700 mb-8">Hai să Discutăm</h3>
                  <p className="text-amber-700 mb-8">
                    Ai întrebări despre serviciile noastre sau dorești să programezi o consultație? 
                    Vizitează pagina noastră de contact pentru mai multe detalii și răspunsuri la întrebările frecvente.
                  </p>
                  <Link 
                    to="/contact"
                    className="inline-block bg-amber-600 text-white px-8 py-3 rounded-lg hover:bg-amber-700 transition-colors duration-200"
                  >
                    Vezi Pagina de Contact
                  </Link>
                </div>
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
      </main>
    </div>
  );
}

export default App;
