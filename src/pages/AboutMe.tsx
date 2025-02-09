import React, { useState, useEffect } from 'react';
import Navbar from '../components/navbar/Navbar';
import { useLoading } from '../contexts/LoadingContext';

const AboutMe = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { startLoading, stopLoading } = useLoading();

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

      <div className="relative z-10 max-w-4xl mx-auto px-4 pt-28 pb-16">
        {/* Photo Frame */}
        <div className="w-48 h-48 mx-auto mb-8 border-4 border-dashed border-amber-200 rounded-full flex items-center justify-center">
          <span className="text-amber-400 text-sm">192x192px</span>
        </div>

        {/* Motto */}
        <blockquote className="text-center italic text-amber-200 mb-12 text-xl">
          "Călătoria este scopul, nu destinația"
        </blockquote>

        {/* Life Section */}
        <section className="mb-12 bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-amber-800 mb-6">Despre mine</h2>
          <p className="text-amber-700 leading-relaxed">
            [Descriere despre viață și experiențe personale]
          </p>
        </section>

        {/* Astrology Section */}
        <section className="mb-12 bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-amber-800 mb-6">Cum am ales astrologia</h2>
          <p className="text-amber-700 leading-relaxed">
            [Descriere despre cum ai descoperit și ai ales astrologia]
          </p>
        </section>

        {/* Future Section */}
        <section className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-amber-800 mb-6">Planuri viitoare</h2>
          <p className="text-amber-700 leading-relaxed">
            [Descriere despre obiective și planuri pentru viitor]
          </p>
        </section>
      </div>
    </div>
  );
};

export default AboutMe;
