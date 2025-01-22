import React, { useState } from 'react';
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
    <div className="container" style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Birth Chart Reading</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="birthDate">Birth Date (dd/mm/yyyy):</label>
          <input
            type="text"
            id="birthDate"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            placeholder="dd/mm/yyyy"
            required
          />
        </div>
        <div>
          <label htmlFor="birthHour">Birth Hour (hh:mm):</label>
          <input
            type="text"
            id="birthHour"
            value={birthHour}
            onChange={(e) => setBirthHour(e.target.value)}
            placeholder="hh:mm"
            required
          />
        </div>
        <div>
          <label htmlFor="birthLocation">Birth Location (City/County/Country):</label>
          <input
            type="text"
            id="birthLocation"
            value={birthLocation}
            onChange={(e) => setBirthLocation(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default BirthChartReading;
