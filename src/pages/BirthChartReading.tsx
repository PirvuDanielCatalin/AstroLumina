import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import countryList from 'react-select-country-list';
import axios from 'axios';

const BirthChartReading: React.FC = () => {
  const [birthDate, setBirthDate] = useState('');
  const [birthHour, setBirthHour] = useState('');
  const [birthCountry, setBirthCountry] = useState('');
  const [birthCounty, setBirthCounty] = useState('');
  const [birthCity, setBirthCity] = useState('');
  const [fullName, setFullName] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [counties, setCounties] = useState<{ value: string, label: string }[]>([]);
  const [cities, setCities] = useState<{ value: string, label: string }[]>([]);
  const navigate = useNavigate();

  const countryOptions = countryList().getData();

  useEffect(() => {
    if (birthCountry) {
      // Fetch counties based on selected country
      axios.get(`/api/counties?country=${birthCountry}`).then(response => {
        const countyOptions = response.data.map((county: string) => ({ value: county, label: county }));
        setCounties(countyOptions);
        setBirthCounty('');
        setBirthCity('');
      });
    }
  }, [birthCountry]);

  useEffect(() => {
    if (birthCounty) {
      // Fetch cities based on selected county
      axios.get(`/api/cities?country=${birthCountry}&county=${birthCounty}`).then(response => {
        const cityOptions = response.data.map((city: string) => ({ value: city, label: city }));
        setCities(cityOptions);
        setBirthCity('');
      });
    }
  }, [birthCounty]);

  const validateInputs = () => {
    const newErrors: { [key: string]: string } = {};
    const datePattern = /^\d{4}-\d{2}-\d{2}$/;
    const timePattern = /^\d{2}:\d{2}$/;

    if (!fullName.trim()) {
      newErrors.fullName = 'Full Name is required';
    }
    if (!birthDate.match(datePattern)) {
      newErrors.birthDate = 'Birth Date must be in yyyy-mm-dd format';
    }
    if (!birthHour.match(timePattern)) {
      newErrors.birthHour = 'Birth Hour must be in hh:mm format';
    }
    if (!birthCountry) {
      newErrors.birthCountry = 'Birth Country is required';
    }
    if (!birthCounty) {
      newErrors.birthCounty = 'Birth County is required';
    }
    if (!birthCity) {
      newErrors.birthCity = 'Birth City is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateInputs()) {
      // Handle form submission logic here
      console.log({ birthDate, birthHour, birthCountry, birthCounty, birthCity, fullName });
    }
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

        <div className="w-full max-w-2xl bg-black/30 backdrop-blur-lg rounded-2xl p-12 shadow-xl border border-white/10">
          <form className="max-w-2xl mx-auto mt-8 p-6 border border-amber-100 rounded bg-white shadow-md" onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-amber-900 mb-2" htmlFor="fullName">Full Name:</label>
              <input
                type="text"
                id="fullName"
                className="w-full p-3 border border-amber-100 rounded"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
              {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
            </div>
            <div className="mb-6">
              <label className="block text-amber-900 mb-2" htmlFor="birthDate">Birth Date:</label>
              <input
                type="date"
                id="birthDate"
                className="w-full p-3 border border-amber-100 rounded"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                required
              />
              {errors.birthDate && <p className="text-red-500 text-sm mt-1">{errors.birthDate}</p>}
            </div>
            <div className="mb-6">
              <label className="block text-amber-900 mb-2" htmlFor="birthHour">Birth Hour:</label>
              <input
                type="time"
                id="birthHour"
                className="w-full p-3 border border-amber-100 rounded"
                value={birthHour}
                onChange={(e) => setBirthHour(e.target.value)}
                required
              />
              {errors.birthHour && <p className="text-red-500 text-sm mt-1">{errors.birthHour}</p>}
            </div>
            <div className="mb-6">
              <label className="block text-amber-900 mb-2" htmlFor="birthCountry">Birth Country:</label>
              <Select
                id="birthCountry"
                options={countryOptions}
                value={countryOptions.find(option => option.value === birthCountry)}
                onChange={(option) => setBirthCountry(option?.value || '')}
                className="w-full p-3 border border-amber-100 rounded"
                required
              />
              {errors.birthCountry && <p className="text-red-500 text-sm mt-1">{errors.birthCountry}</p>}
            </div>
            <div className="mb-6">
              <label className="block text-amber-900 mb-2" htmlFor="birthCounty">Birth County:</label>
              <Select
                id="birthCounty"
                options={counties}
                value={counties.find(county => county.value === birthCounty)}
                onChange={(option) => setBirthCounty(option?.value || '')}
                className="w-full p-3 border border-amber-100 rounded"
                required
              />
              {errors.birthCounty && <p className="text-red-500 text-sm mt-1">{errors.birthCounty}</p>}
            </div>
            <div className="mb-6">
              <label className="block text-amber-900 mb-2" htmlFor="birthCity">Birth City:</label>
              <Select
                id="birthCity"
                options={cities}
                value={cities.find(city => city.value === birthCity)}
                onChange={(option) => setBirthCity(option?.value || '')}
                className="w-full p-3 border border-amber-100 rounded"
                required
              />
              {errors.birthCity && <p className="text-red-500 text-sm mt-1">{errors.birthCity}</p>}
            </div>
            <button className="w-full p-3 bg-amber-900 text-white rounded hover:bg-amber-700" type="submit">Get Reading</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BirthChartReading;
