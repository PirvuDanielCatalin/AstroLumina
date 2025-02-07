import React from 'react';

const AboutMe = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Photo Frame */}
      <div className="w-48 h-48 mx-auto mb-4 border-4 border-dashed border-gray-300 rounded-full flex items-center justify-center">
        <span className="text-gray-400 text-sm">192x192px</span>
      </div>

      {/* Motto */}
      <blockquote className="text-center italic text-gray-600 mb-8">
        "Călătoria este scopul, nu destinația"
      </blockquote>

      {/* Life Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Despre mine</h2>
        <p className="text-gray-700 leading-relaxed">
          [Descriere despre viață și experiențe personale]
        </p>
      </section>

      {/* Astrology Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Cum am ales astrologia</h2>
        <p className="text-gray-700 leading-relaxed">
          [Descriere despre cum ai descoperit și ai ales astrologia]
        </p>
      </section>

      {/* Future Section */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Planuri viitoare</h2>
        <p className="text-gray-700 leading-relaxed">
          [Descriere despre obiective și planuri pentru viitor]
        </p>
      </section>
    </div>
  );
};

export default AboutMe;
