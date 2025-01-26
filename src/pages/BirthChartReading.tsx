import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BirthChartReading: React.FC = () => {
  const [birthDate, setBirthDate] = useState('');
  const [birthHour, setBirthHour] = useState('');
  const [birthLocation, setBirthLocation] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log({ birthDate, birthHour, birthLocation });
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Starry background */}
      <div className="absolute inset-0 stars">
        {/* Shooting stars */}
        <div className="shooting-star"></div>
        <div className="shooting-star"></div>
        <div className="shooting-star"></div>
        <div className="shooting-star"></div>
        <div className="shooting-star"></div>
        
        {/* Subtle overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30"></div>
      </div>

      <div className="relative min-h-screen flex flex-col items-center justify-center p-4">
        {/* Logo and Title */}
        <div className="mb-8 text-center">
          <div className="flex justify-center mb-4">
            <Star className="w-12 h-12 text-yellow-200" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">
            Birth Chart Reading
          </h2>
        </div>

        <div className="w-full max-w-md bg-black/30 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-white/10">
          <form className="max-w-md mx-auto mt-8 p-4 border border-amber-100 rounded bg-white shadow-md" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-amber-900 mb-2" htmlFor="birthDate">Birth Date (dd/mm/yyyy):</label>
              <input
                type="text"
                id="birthDate"
                className="w-full p-2 border border-amber-100 rounded"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                placeholder="dd/mm/yyyy"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-amber-900 mb-2" htmlFor="birthHour">Birth Hour (hh:mm):</label>
              <input
                type="text"
                id="birthHour"
                className="w-full p-2 border border-amber-100 rounded"
                value={birthHour}
                onChange={(e) => setBirthHour(e.target.value)}
                placeholder="hh:mm"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-amber-900 mb-2" htmlFor="birthLocation">Birth Location (City/County/Country):</label>
              <input
                type="text"
                id="birthLocation"
                className="w-full p-2 border border-amber-100 rounded"
                value={birthLocation}
                onChange={(e) => setBirthLocation(e.target.value)}
                required
              />
            </div>
            <button className="w-full p-2 bg-amber-900 text-white rounded hover:bg-amber-700" type="submit">Get Reading</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BirthChartReading;
