import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useLoading } from '../contexts/LoadingContext';

const Services = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { startLoading, stopLoading } = useLoading();

  // Loading effect
  useEffect(() => {
    startLoading();
    const timer = setTimeout(() => {
      stopLoading();
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const services = [
    {
      id: 'planet-positions',
      title: 'Poziția Planetelor în Timp Real',
      description: 'Află pozițiile exacte ale planetelor în acest moment și cum acestea influențează energia zilei. Un instrument esențial pentru planificarea activităților și înțelegerea influențelor astrologice curente.',
      details: [
        'Poziții planetare actualizate în timp real',
        'Interpretarea influențelor planetare curente',
        'Vizualizare grafică a pozițiilor planetare',
        'Informații despre semnele zodiacale curente',
        'Acces gratuit 24/7'
      ],
      duration: 'Acces instant',
      price: 'Gratuit',
      link: '/services/planet-positions',
      highlight: true
    },
    {
      id: 'natal-chart',
      title: 'Interpretare Hartă Natală',
      description: 'O analiză detaliată a hărții tale astrologice de naștere, care dezvăluie aspectele cheie ale personalității tale, potențialul și provocările vieții.',
      details: [
        'Analiza detaliată a poziției Soarelui, Lunii și Ascendentului',
        'Interpretarea plasamentelor planetare în case și semne',
        'Identificarea aspectelor majore și impactul lor',
        'Descoperirea nodurilor lunare și a destinului personal',
        'Recomandări pentru dezvoltare personală bazate pe hartă'
      ],
      duration: '90 minute',
      price: '350 RON',
      link: '/services/natal-chart'
    },
    {
      id: 'transit-forecast',
      title: 'Previziuni și Tranzituri',
      description: 'O explorare a influențelor astrologice curente și viitoare în viața ta, oferind ghidare pentru decizii importante și oportunități de creștere.',
      details: [
        'Analiza tranzitelor planetare curente',
        'Previziuni pentru următoarele 12 luni',
        'Identificarea perioadelor favorabile pentru diferite activități',
        'Strategii pentru gestionarea provocărilor',
        'Sfaturi practice pentru maximizarea oportunităților'
      ],
      duration: '60 minute',
      price: '300 RON',
      link: '/services/transit-forecast'
    },
    {
      id: 'relationship-synastry',
      title: 'Astrologie Relațională și Sinastrie',
      description: 'O analiză profundă a compatibilității și dinamicii dintre două persoane, ideală pentru relații romantice, parteneriate de afaceri sau relații părinte-copil.',
      details: [
        'Compararea hărților natale ale celor două persoane',
        'Analiza aspectelor interplanetare',
        'Evaluarea compatibilității emoționale și intelectuale',
        'Identificarea punctelor forte și a provocărilor în relație',
        'Sfaturi pentru îmbunătățirea comunicării și înțelegerii'
      ],
      duration: '120 minute',
      price: '400 RON',
      link: '/services/relationship-synastry'
    },
    {
      id: 'career-guidance',
      title: 'Ghidare în Carieră',
      description: 'O analiză specializată a potențialului profesional bazată pe harta natală, ajutându-te să identifici direcția optimă de carieră și oportunitățile de dezvoltare.',
      details: [
        'Analiza casei a 10-a și a plasamentelor profesionale',
        'Identificarea talentelor și abilităților naturale',
        'Evaluarea ciclurilor planetare pentru schimbări în carieră',
        'Recomandări pentru dezvoltare profesională',
        'Strategii de aliniere a carierei cu scopul personal'
      ],
      duration: '90 minute',
      price: '350 RON',
      link: '/services/career-guidance'
    },
    {
      id: 'solar-return',
      title: 'Analiza Revoluției Solare',
      description: 'O previziune detaliată pentru anul tău astrologic, începând cu ziua ta de naștere, care evidențiază temele principale și oportunitățile anului ce urmează.',
      details: [
        'Interpretarea hărții revoluției solare',
        'Comparația cu harta natală',
        'Identificarea temelor principale ale anului',
        'Previziuni lunare detaliate',
        'Recomandări pentru maximizarea potențialului anual'
      ],
      duration: '75 minute',
      price: '325 RON',
      link: '/services/solar-return'
    },
    {
      id: 'electional-astrology',
      title: 'Astrologie Elecțională',
      description: 'Identificarea celui mai favorabil moment pentru a începe un proiect important, precum o căsătorie, lansarea unei afaceri sau semnarea unor contracte.',
      details: [
        'Analiza perioadelor favorabile pentru acțiune',
        'Evaluarea aspectelor planetare relevante',
        'Selectarea datei și orei optime',
        'Strategii de evitare a perioadelor dificile',
        'Recomandări pentru maximizarea succesului'
      ],
      duration: '60 minute',
      price: '300 RON',
      link: '/services/electional-astrology'
    }
  ];

  return (
    <div className="relative min-h-screen">
      {/* Starry background - fixed position */}
      <div className="fixed inset-0 bg-black stars">
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
      </div>

      {/* Navbar */}
      <Navbar isScrolled={isScrolled} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 pt-28 pb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-amber-200 mb-12">
          Servicii Astrologice
        </h1>
        
        <div className="grid gap-12">
          {services.map((service) => (
            <div key={service.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                  <h2 className="text-3xl font-bold text-amber-800 mb-4 md:mb-0">
                    {service.title}
                  </h2>
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                    <div className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-amber-700">{service.duration}</span>
                    </div>
                    <div className="text-xl font-semibold text-amber-600">
                      {service.price}
                    </div>
                  </div>
                </div>

                <p className="text-lg text-amber-700 mb-6">
                  {service.description}
                </p>

                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-amber-800 mb-4">Ce include:</h3>
                  <ul className="space-y-3">
                    {service.details.map((detail, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-amber-700">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  to={service.link}
                  className="inline-block bg-amber-500 text-white px-8 py-3 rounded-lg hover:bg-amber-600 transition-colors duration-200"
                >
                  Află mai multe
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
