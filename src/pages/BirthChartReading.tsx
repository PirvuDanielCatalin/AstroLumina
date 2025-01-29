import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { Country, State, City } from 'country-state-city';
import axios from 'axios';
import { format } from 'date-fns';

const BirthChartReading: React.FC = () => {
  const [birthDate, setBirthDate] = useState('');
  const [birthHour, setBirthHour] = useState('');
  const [birthCountry, setBirthCountry] = useState('');
  const [birthCounty, setBirthCounty] = useState('');
  const [birthCity, setBirthCity] = useState('');
  const [fullName, setFullName] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [countryOptions, setCountryOptions] = useState<{ value: string, label: string }[]>([{ value: '', label: 'Select ...' }]);
  const [stateOptions, setStateOptions] = useState<{ value: string, label: string }[]>([{ value: '', label: 'Select ...' }]);
  const [cityOptions, setCityOptions] = useState<{ value: string, label: string }[]>([{ value: '', label: 'Select ...' }]);
  const [coordinates, setCoordinates] = useState<{ lat: number, lng: number } | null>(null);
  const [readingResult, setReadingResult] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const countries = Country.getAllCountries().map(country => ({ value: country.isoCode, label: country.name }));
    setCountryOptions([{ value: '', label: 'Select ...' }, ...countries]);
  }, []);

  useEffect(() => {
    if (birthCountry) {
      const states = State.getStatesOfCountry(birthCountry).map(state => ({
        value: state.isoCode,
        label: state.name.replace(/ County$| Province$/, '') // Remove 'County' and 'Province' from the label
      }));
      setStateOptions([{ value: '', label: 'Select ...' }, ...states]);
      setBirthCounty('');
      setBirthCity('');
      setCityOptions([{ value: '', label: 'Select ...' }]); // Reset city options
    }
  }, [birthCountry]);

  useEffect(() => {
    if (birthCounty) {
      const cities = City.getCitiesOfState(birthCountry, birthCounty).map(city => ({ value: city.name, label: city.name }));
      setCityOptions([{ value: '', label: 'Select ...' }, ...cities]);
      setBirthCity('');
    }
  }, [birthCounty]);

  useEffect(() => {
    if (birthCity) {
      const cityData = City.getCitiesOfState(birthCountry, birthCounty).find(city => city.name === birthCity);
      if (cityData) {
        setCoordinates({ lat: Number(cityData.latitude), lng: Number(cityData.longitude) });
      }
    }
  }, [birthCity]);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateInputs() && coordinates) {
      const [year, month, day] = birthDate.split('-').map(Number);
      const [hour, minute] = birthHour.split(':').map(Number);

      const payload = {
        longitude: coordinates.lng,
        latitude: coordinates.lat,
        year,
        month,
        day,
        hour,
        minute,
      };

      try {
        const response = await axios.post('https://api.astromagia.ro/api/v1/calc', payload, {
          headers: {
            'x-api-key': 'a856eb80c8be5ab0221f42b6595f70fd',
          },
        });
        setReadingResult(response.data);
      } catch (error) {
        console.error('API request error:', error);
      }
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, 'dd MMMM yyyy');
  };

  const formatTime = (timeString: string) => {
    const [hour, minute] = timeString.split(':');
    return `${hour}:${minute}`;
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
          {!readingResult ? (
            <form className="max-w-2xl mx-auto mt-8 p-6 border border-amber-100 rounded bg-white shadow-md" onSubmit={handleSubmit}>
              <div className="mb-6">
                <label className="block text-amber-900 mb-2" htmlFor="fullName">Full Name</label>
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
                <label className="block text-amber-900 mb-2" htmlFor="birthDate">Birth Date</label>
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
                <label className="block text-amber-900 mb-2" htmlFor="birthHour">Birth Hour</label>
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
                <label className="block text-amber-900 mb-2" htmlFor="birthCountry">Birth Country</label>
                <Select
                  id="birthCountry"
                  options={countryOptions}
                  value={countryOptions.find(option => option.value === birthCountry)}
                  onChange={(option) => {
                    setBirthCountry(option?.value || '');
                    setBirthCounty('');
                    setBirthCity('');
                    setStateOptions([{ value: '', label: 'Select ...' }]);
                    setCityOptions([{ value: '', label: 'Select ...' }]);
                  }}
                  className="w-full p-3 border border-amber-100 rounded"
                  required
                />
                {errors.birthCountry && <p className="text-red-500 text-sm mt-1">{errors.birthCountry}</p>}
              </div>
              <div className="mb-6">
                <label className="block text-amber-900 mb-2" htmlFor="birthCounty">Birth County</label>
                <Select
                  id="birthCounty"
                  options={stateOptions}
                  value={stateOptions.find(option => option.value === birthCounty)}
                  onChange={(option) => {
                    setBirthCounty(option?.value || '');
                    setBirthCity('');
                    setCityOptions([{ value: '', label: 'Select ...' }]);
                  }}
                  className="w-full p-3 border border-amber-100 rounded"
                  required
                />
                {errors.birthCounty && <p className="text-red-500 text-sm mt-1">{errors.birthCounty}</p>}
              </div>
              <div className="mb-6">
                <label className="block text-amber-900 mb-2" htmlFor="birthCity">Birth City</label>
                <Select
                  id="birthCity"
                  options={cityOptions}
                  value={cityOptions.find(option => option.value === birthCity)}
                  onChange={(option) => setBirthCity(option?.value || '')}
                  className="w-full p-3 border border-amber-100 rounded"
                  required
                />
                {errors.birthCity && <p className="text-red-500 text-sm mt-1">{errors.birthCity}</p>}
              </div>
              <button className="w-full p-3 bg-amber-900 text-white rounded hover:bg-amber-700" type="submit">Get Reading</button>
            </form>
          ) : (
            <div className="max-w-2xl mx-auto mt-8 p-6 border border-amber-100 rounded bg-white shadow-md text-center">
              <h3 className="text-3xl font-bold text-amber-900 mb-4">{fullName}</h3>
              <p className="text-amber-700 mb-4">{formatDate(birthDate)} at {formatTime(birthHour)}</p>
              <p className="text-amber-700 mb-4">{birthCity}, {birthCounty}, {birthCountry}</p>
              <table className="w-full text-left border-collapse mt-6">
                <thead>
                  <tr>
                    <th className="border-b p-2">Planet</th>
                    <th className="border-b p-2">Sign</th>
                    <th className="border-b p-2">House</th>
                  </tr>
                </thead>
                <tbody>
                  {readingResult.dynamicTexts.map((item: any, index: number) => (
                    <tr key={index}>
                      <td className="border-b p-2">{item.planet}</td>
                      <td className="border-b p-2">{item.sign}</td>
                      <td className="border-b p-2">{item.house}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BirthChartReading;
