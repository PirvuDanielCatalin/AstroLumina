import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import Select from 'react-select';
import { Country, State, City } from 'country-state-city';
import axios from 'axios';
import 'flatpickr/dist/themes/material_blue.css';
import Flatpickr from 'react-flatpickr';
import { useLoading } from '../contexts/LoadingContext';

// Types
interface LocationCoordinates {
  lat: number;
  lng: number;
}

interface FormErrors {
  [key: string]: string;
}

interface SelectOption {
  value: string;
  label: string;
}

interface ReadingPayload {
  longitude: number;
  latitude: number;
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
}

interface PlanetPosition {
  planet: string;
  sign: string;
  house: string;
}

interface ReadingResult {
  dynamicTexts: PlanetPosition[];
}

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
  onSubmit: (data: ReadingPayload, userInfo: { name: string, city: string, country: string }) => void;
}> = ({ onSubmit }) => {
  console.log('BirthDataForm rendering');
  
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
        label: state.name.replace(/ County$| Province$/, '')
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
      const payload: ReadingPayload = {
        longitude: coordinates.lng,
        latitude: coordinates.lat,
        year: birthDate.getFullYear(),
        month: birthDate.getMonth() + 1,
        day: birthDate.getDate(),
        hour: birthHour.getHours(),
        minute: birthHour.getMinutes(),
      };
      onSubmit(payload, {
        name: fullName,
        city: birthCity,
        country: birthCountry
      });
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
  console.log('Rendering results with:', result);
  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 border border-amber-100 rounded bg-white shadow-md text-center">
      <h3 className="text-3xl font-bold text-amber-900 mb-4">{userInfo.name}</h3>
      <p className="text-amber-700 mb-4">
        {formatDate(userInfo.birthDate)} at {formatTime(userInfo.birthHour)}
      </p>
      <p className="text-amber-700 mb-4">{userInfo.location}</p>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse mt-6">
          <thead>
            <tr className="bg-amber-50">
              <th className="p-3 font-medium text-amber-900">Planet</th>
              <th className="p-3 font-medium text-amber-900">Sign</th>
              <th className="p-3 font-medium text-amber-900">House</th>
            </tr>
          </thead>
          <tbody>
            {result.dynamicTexts?.map((position, index) => {
              console.log('Rendering position:', position);
              return (
                <tr key={index} className="border-b border-amber-100">
                  <td className="p-3 text-amber-700">{position.planet}</td>
                  <td className="p-3 text-amber-700">{position.sign}</td>
                  <td className="p-3 text-amber-700">{position.house}</td>
                </tr>
              );
            })}
            {result.dynamicTexts.some(item => item.planet === 'Nodul Nord') && (
              <tr className="border-b border-amber-100">
                <td className="p-3 text-amber-700">Nodul Sud</td>
                <td className="p-3 text-amber-700">
                  {calculateSouthNode(
                    result.dynamicTexts.find(item => item.planet === 'Nodul Nord')!.sign,
                    result.dynamicTexts.find(item => item.planet === 'Nodul Nord')!.house
                  ).sign}
                </td>
                <td className="p-3 text-amber-700">
                  {calculateSouthNode(
                    result.dynamicTexts.find(item => item.planet === 'Nodul Nord')!.sign,
                    result.dynamicTexts.find(item => item.planet === 'Nodul Nord')!.house
                  ).house}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Main Component
const PlanetPositions: React.FC = () => {
  const { stopLoading } = useLoading();
  const [readingResult, setReadingResult] = useState<ReadingResult | null>(null);
  const [userInfo, setUserInfo] = useState<{
    name: string;
    birthDate: Date;
    birthHour: Date;
    location: string;
  } | null>(null);

  useEffect(() => {
    // Stop loading when component mounts
    stopLoading();
  }, [stopLoading]);

  useEffect(() => {
    console.log('PlanetPositions mounted');
    console.log('readingResult:', readingResult);
    console.log('userInfo:', userInfo);
  }, [readingResult, userInfo]);

  const handleFormSubmit = async (payload: ReadingPayload, userFormInfo: { name: string, city: string, country: string }) => {
    console.log('Form submitted with payload:', payload);
    try {
      const result = await fetchReading(payload);
      setReadingResult(result);
      
      // Set user info with the form data
      const birthDate = new Date(payload.year, payload.month - 1, payload.day);
      const birthHour = new Date(payload.year, payload.month - 1, payload.day, payload.hour, payload.minute);
      setUserInfo({
        name: userFormInfo.name,
        birthDate,
        birthHour,
        location: `${userFormInfo.city}, ${userFormInfo.country}`
      });
    } catch (error) {
      console.error('Failed to get reading:', error);
      // Here you could add a toast notification or other error UI
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Starry background */}
      <div className="absolute inset-0 stars">
        <div className="shooting-star"></div>
        <div className="shooting-star"></div>
        <div className="shooting-star"></div>
        <div className="shooting-star"></div>
        <div className="shooting-star"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30"></div>
      </div>

      <div className="relative min-h-screen flex flex-col items-center justify-center p-4">
        {/* Logo and Title */}
        <div className="mb-8 text-center">
          <div className="flex justify-center mb-4">
            <Star className="w-12 h-12 text-yellow-200" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">
            Planet Positions
          </h2>
        </div>

        <div className="w-full max-w-2xl bg-white/80 backdrop-blur-lg rounded-2xl p-12 shadow-xl">
          {!readingResult ? (
            <BirthDataForm onSubmit={handleFormSubmit} />
          ) : userInfo && (
            <ReadingResults result={readingResult} userInfo={userInfo} />
          )}
        </div>
      </div>
    </div>
  );
};

export default PlanetPositions;
