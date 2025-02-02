import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import Select from 'react-select';
import { Country, State, City } from 'country-state-city';
import axios from 'axios';
import 'flatpickr/dist/themes/material_blue.css';
import Flatpickr from 'react-flatpickr';
import { useLoading } from '../contexts/LoadingContext';
import { 
  LocationCoordinates,
  FormErrors,
  SelectOption,
  ReadingPayload,
  PlanetPosition,
  ReadingResult 
} from '../types/planetPositions';
import { planetSymbols, planetOrder } from '../constants/astrology';
import astralChartSvg from '../assets/astral-chart.svg';

// API Service
const API_KEY = 'a856eb80c8be5ab0221f42b6595f70fd';
const API_URL = 'https://api.astromagia.ro/api/v1/calc';

const fetchReading = async (payload: ReadingPayload): Promise<ReadingResult> => {
  try {
    const response = await axios.post(API_URL, payload, {
      headers: {
        'x-api-key': API_KEY,
      },
    });
    console.log('API Response:', response.data);
    return {
      dynamicTexts: response.data.dynamicTexts.map((p: any) => ({
        planet: p.planet,
        sign: p.sign,
        house: p.house
      }))
    };
  } catch (error) {
    console.error('API request error:', error);
    throw new Error('Failed to fetch reading');
  }
};

// Utility functions
const formatDate = (date: Date): string => {
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
};

const formatTime = (date: Date): string => {
  return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
};

const calculateSouthNode = (northNodeSign: string, northNodeHouse: string) => {
  const signs = [
    'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
    'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
  ];
  const houses = ['House 1', 'House 2', 'House 3', 'House 4', 'House 5', 'House 6', 
                 'House 7', 'House 8', 'House 9', 'House 10', 'House 11', 'House 12'];
  
  const northNodeSignIndex = signs.indexOf(northNodeSign);
  const northNodeHouseIndex = houses.indexOf(northNodeHouse);
  
  return {
    sign: signs[(northNodeSignIndex + 6) % 12],
    house: houses[(northNodeHouseIndex + 6) % 12]
  };
};

// Form Component
const BirthDataForm: React.FC<{
  onSubmit: (payload: ReadingPayload, displayData: { name: string; location: string }) => void;
}> = ({ onSubmit }) => {
  const [birthDate, setBirthDate] = useState<Date | null>(null);
  const [birthHour, setBirthHour] = useState<Date | null>(null);
  const [birthCountry, setBirthCountry] = useState('');
  const [birthCounty, setBirthCounty] = useState('');
  const [birthCity, setBirthCity] = useState('');
  const [fullName, setFullName] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [coordinates, setCoordinates] = useState<LocationCoordinates | null>(null);
  
  const [countryOptions, setCountryOptions] = useState<SelectOption[]>([{ value: '', label: 'Select ...' }]);
  const [stateOptions, setStateOptions] = useState<SelectOption[]>([{ value: '', label: 'Select ...' }]);
  const [cityOptions, setCityOptions] = useState<SelectOption[]>([{ value: '', label: 'Select ...' }]);

  // Location data effects
  useEffect(() => {
    const countries = Country.getAllCountries().map(country => ({ 
      value: country.isoCode, 
      label: country.name 
    }));
    setCountryOptions([{ value: '', label: 'Select ...' }, ...countries]);
  }, []);

  useEffect(() => {
    if (birthCountry) {
      const states = State.getStatesOfCountry(birthCountry).map(state => ({
        value: state.isoCode,
        label: state.name.replace(/ County$| Province$| District$/, '')
      }));
      setStateOptions([{ value: '', label: 'Select ...' }, ...states]);
      setBirthCounty('');
      setBirthCity('');
      setCityOptions([{ value: '', label: 'Select ...' }]);
    }
  }, [birthCountry]);

  useEffect(() => {
    if (birthCounty) {
      const cities = City.getCitiesOfState(birthCountry, birthCounty).map(city => ({ 
        value: city.name, 
        label: city.name 
      }));
      setCityOptions([{ value: '', label: 'Select ...' }, ...cities]);
      setBirthCity('');
    }
  }, [birthCounty, birthCountry]);

  useEffect(() => {
    if (birthCity) {
      const cityData = City.getCitiesOfState(birthCountry, birthCounty)
        .find(city => city.name === birthCity);
      if (cityData) {
        setCoordinates({ 
          lat: Number(cityData.latitude), 
          lng: Number(cityData.longitude) 
        });
      }
    }
  }, [birthCity, birthCountry, birthCounty]);

  const validateInputs = (): boolean => {
    const newErrors: FormErrors = {};

    if (!fullName.trim()) newErrors.fullName = 'Full Name is required';
    if (!birthDate) newErrors.birthDate = 'Birth Date is required';
    if (!birthHour) newErrors.birthHour = 'Birth Hour is required';
    if (!birthCountry) newErrors.birthCountry = 'Birth Country is required';
    if (!birthCounty) newErrors.birthCounty = 'Birth County is required';
    if (!birthCity) newErrors.birthCity = 'Birth City is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateInputs() && coordinates && birthDate && birthHour) {
      // API payload with just the required fields
      const payload: ReadingPayload = {
        longitude: coordinates.lng,
        latitude: coordinates.lat,
        year: birthDate.getFullYear(),
        month: birthDate.getMonth() + 1,
        day: birthDate.getDate(),
        hour: birthHour.getHours(),
        minute: birthHour.getMinutes()
      };
      
      // Get the actual location names for display
      const country = Country.getCountryByCode(birthCountry)?.name || birthCountry;
      const state = State.getStateByCodeAndCountry(birthCounty, birthCountry)?.name || birthCounty;
      const cities = City.getCitiesOfState(birthCountry, birthCounty);
      const city = cities.find(c => c.name === birthCity)?.name || birthCity;
      
      // Pass both the API payload and display data separately
      onSubmit(
        payload,
        {
          name: fullName,
          location: `${city}, ${state}, ${country}`
        }
      );
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="mb-6">
        <label className="block text-gray-800 mb-2" htmlFor="fullName">Full Name</label>
        <input
          type="text"
          id="fullName"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
        {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
      </div>
      
      <div className="mb-6">
        <label className="block text-gray-800 mb-2" htmlFor="birthDate">Birth Date</label>
        <Flatpickr
          value={birthDate}
          onChange={(date) => setBirthDate(date[0])}
          options={{
            dateFormat: "d/m/Y",
            allowInput: true,
            onClose: (selectedDates) => setBirthDate(selectedDates[0]),
          }}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          placeholder="Select date..."
          required
        />
        {errors.birthDate && <p className="text-red-500 text-sm mt-1">{errors.birthDate}</p>}
      </div>

      <div className="mb-6">
        <label className="block text-gray-800 mb-2" htmlFor="birthHour">Birth Hour</label>
        <Flatpickr
          value={birthHour}
          onChange={(date) => setBirthHour(date[0])}
          options={{
            enableTime: true,
            noCalendar: true,
            dateFormat: "H:i",
            time_24hr: true,
            allowInput: true,
            minuteIncrement: 1,
            onClose: (selectedDates) => setBirthHour(selectedDates[0]),
          }}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          placeholder="Select time..."
          required
        />
        {errors.birthHour && <p className="text-red-500 text-sm mt-1">{errors.birthHour}</p>}
      </div>

      <div className="mb-6">
        <label className="block text-gray-800 mb-2" htmlFor="birthCountry">Birth Country</label>
        <Select
          id="birthCountry"
          options={countryOptions}
          value={countryOptions.find(option => option.value === birthCountry)}
          onChange={(option) => option && setBirthCountry(option.value)}
          className="w-full"
          classNamePrefix="select"
          styles={{
            control: (base) => ({
              ...base,
              borderColor: '#d1d5db',
              borderRadius: '0.5rem',
              '&:hover': {
                borderColor: '#d1d5db'
              }
            }),
            option: (base, state) => ({
              ...base,
              backgroundColor: state.isFocused ? '#fde68a' : 'white',
              color: '#1f2937',
              '&:hover': {
                backgroundColor: '#fde68a'
              }
            })
          }}
        />
        {errors.birthCountry && <p className="text-red-500 text-sm mt-1">{errors.birthCountry}</p>}
      </div>

      <div className="mb-6">
        <label className="block text-gray-800 mb-2" htmlFor="birthCounty">Birth County</label>
        <Select
          id="birthCounty"
          options={stateOptions}
          value={stateOptions.find(option => option.value === birthCounty)}
          onChange={(option) => option && setBirthCounty(option.value)}
          className="w-full"
          classNamePrefix="select"
          styles={{
            control: (base) => ({
              ...base,
              borderColor: '#d1d5db',
              borderRadius: '0.5rem',
              '&:hover': {
                borderColor: '#d1d5db'
              }
            }),
            option: (base, state) => ({
              ...base,
              backgroundColor: state.isFocused ? '#fde68a' : 'white',
              color: '#1f2937',
              '&:hover': {
                backgroundColor: '#fde68a'
              }
            })
          }}
        />
        {errors.birthCounty && <p className="text-red-500 text-sm mt-1">{errors.birthCounty}</p>}
      </div>

      <div className="mb-6">
        <label className="block text-gray-800 mb-2" htmlFor="birthCity">Birth City</label>
        <Select
          id="birthCity"
          options={cityOptions}
          value={cityOptions.find(option => option.value === birthCity)}
          onChange={(option) => option && setBirthCity(option.value)}
          className="w-full"
          classNamePrefix="select"
          styles={{
            control: (base) => ({
              ...base,
              borderColor: '#d1d5db',
              borderRadius: '0.5rem',
              '&:hover': {
                borderColor: '#d1d5db'
              }
            }),
            option: (base, state) => ({
              ...base,
              backgroundColor: state.isFocused ? '#fde68a' : 'white',
              color: '#1f2937',
              '&:hover': {
                backgroundColor: '#fde68a'
              }
            })
          }}
        />
        {errors.birthCity && <p className="text-red-500 text-sm mt-1">{errors.birthCity}</p>}
      </div>

      <button 
        className="w-full p-4 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors font-semibold" 
        type="submit"
      >
        Get Reading
      </button>
    </form>
  );
};

// Results Component
const ReadingResults: React.FC<{
  result: ReadingResult;
  userInfo: {
    name: string;
    birthDate: Date;
    birthHour: Date;
    location: string;
  };
}> = ({ result, userInfo }) => {
  // Sort planets according to the defined order
  const sortedPlanets = [...result.dynamicTexts].sort((a, b) => {
    const indexA = planetOrder.indexOf(a.planet);
    const indexB = planetOrder.indexOf(b.planet);
    // If both planets are not in the order list, maintain original order
    if (indexA === -1 && indexB === -1) return 0;
    // If one planet is not in the list, put it at the end
    if (indexA === -1) return 1;
    if (indexB === -1) return -1;
    // Otherwise sort by the defined order
    return indexA - indexB;
  });

  return (
    <div className="w-full text-center">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-amber-900 mb-2">{userInfo.name}</h3>
        <p className="text-lg text-amber-700">
          {formatDate(userInfo.birthDate)} at {formatTime(userInfo.birthHour)}
        </p>
        <p className="text-lg text-amber-700 mb-4">{userInfo.location}</p>
      </div>

      <div className="bg-white rounded-lg shadow-md">
        <h4 className="text-xl font-semibold text-amber-900 mb-4">Planetary Positions</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-amber-50">
                <th className="p-2 sm:p-3 font-medium text-amber-900 text-sm sm:text-base">Planet</th>
                <th className="p-2 sm:p-3 font-medium text-amber-900 text-sm sm:text-base">Sign</th>
                <th className="p-2 sm:p-3 font-medium text-amber-900 text-sm sm:text-base">House</th>
              </tr>
            </thead>
            <tbody>
              {sortedPlanets.map((position, index) => (
                <tr key={index} className="border-b border-amber-100">
                  <td className="p-2 sm:p-3 text-amber-700 text-sm sm:text-base whitespace-normal">
                    <span className="mr-2 font-semibold">{planetSymbols[position.planet] || ''}</span>
                    {position.planet}
                  </td>
                  <td className="p-2 sm:p-3 text-amber-700 text-sm sm:text-base whitespace-normal">{position.sign}</td>
                  <td className="p-2 sm:p-3 text-amber-700 text-sm sm:text-base whitespace-normal">{position.house}</td>
                </tr>
              ))}
              {sortedPlanets.some(item => item.planet === 'Nodul Nord') && (
                <tr className="border-b border-amber-100">
                  <td className="p-2 sm:p-3 text-amber-700 text-sm sm:text-base whitespace-normal">
                    <span className="mr-2 font-semibold">{planetSymbols['Nodul Sud']}</span>
                    Nodul Sud
                  </td>
                  <td className="p-2 sm:p-3 text-amber-700 text-sm sm:text-base whitespace-normal">
                    {calculateSouthNode(
                      sortedPlanets.find(item => item.planet === 'Nodul Nord')!.sign,
                      sortedPlanets.find(item => item.planet === 'Nodul Nord')!.house
                    ).sign}
                  </td>
                  <td className="p-2 sm:p-3 text-amber-700 text-sm sm:text-base whitespace-normal">
                    {calculateSouthNode(
                      sortedPlanets.find(item => item.planet === 'Nodul Nord')!.sign,
                      sortedPlanets.find(item => item.planet === 'Nodul Nord')!.house
                    ).house}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Main Component
const PlanetPositions = () => {
  const [result, setResult] = useState<ReadingResult | null>(null);
  const [userInfo, setUserInfo] = useState<{
    name: string;
    birthDate: Date;
    birthHour: Date;
    location: string;
  } | null>(null);
  const { startLoading, stopLoading } = useLoading();

  useEffect(() => {
    startLoading();
    const timeoutId = window.setTimeout(() => {
      stopLoading();
    }, 1500);
    return () => window.clearTimeout(timeoutId);
  }, [startLoading, stopLoading]);

  const handleSubmit = async (
    payload: ReadingPayload,
    displayData: { name: string; location: string }
  ) => {
    startLoading();
    try {
      const readingResult = await fetchReading(payload);
      setResult(readingResult);
      setUserInfo({
        name: displayData.name,
        birthDate: new Date(payload.year, payload.month - 1, payload.day),
        birthHour: new Date(payload.year, payload.month - 1, payload.day, payload.hour, payload.minute),
        location: displayData.location
      });
    } catch (error) {
      console.error('Error fetching reading:', error);
      setResult(null);
      setUserInfo(null);
    } finally {
      stopLoading();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 py-6 px-4 sm:py-12 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="flex flex-col md:flex-row">
            {/* Left Panel - Service Description - Hidden on mobile */}
            <div className="hidden md:block md:w-1/2 p-8 bg-gradient-to-br from-purple-50 to-indigo-50">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Discover Your Celestial Blueprint
              </h2>
              <div className="mb-8">
                <img
                  src={astralChartSvg}
                  alt="Astral Chart"
                  className="w-full max-w-md mx-auto mb-6"
                />
              </div>
              <div className="prose prose-indigo">
                <p className="text-lg text-gray-600 mb-4">
                  Unlock the secrets of the cosmos and gain deep insights into your astrological profile. Our advanced planetary position calculator provides precise astronomical data to help you understand the celestial influences at any given moment.
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Accurate planetary positions</li>
                  <li>Detailed house placements</li>
                  <li>Zodiac sign interpretations</li>
                  <li>Real-time astronomical calculations</li>
                </ul>
              </div>
            </div>
            
            {/* Right Panel - Form or Results */}
            <div className="w-full md:w-1/2 p-4 sm:p-8">
              {/* Mobile Title */}
              <div className="block md:hidden mb-6 text-center">
                <h2 className="text-2xl font-bold text-gray-900">
                  Discover Your Celestial Blueprint
                </h2>
              </div>
              
              {!result || !userInfo ? (
                <BirthDataForm onSubmit={handleSubmit} />
              ) : (
                <ReadingResults result={result} userInfo={userInfo} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanetPositions;
