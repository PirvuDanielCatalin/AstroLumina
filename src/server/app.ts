import express from 'express';
import countryList from 'react-select-country-list';
import ct from 'countries-and-timezones';

const app = express();
const port = 3000;

app.get('/api/counties', (req, res) => {
  const country = req.query.country as string;
  const countryData = ct.getCountry(country);
  const states = countryData ? countryData.states : [];
  const counties = Object.keys(states).map(stateCode => states[stateCode].name);
  res.json(counties);
});

app.get('/api/cities', (req, res) => {
  const country = req.query.country as string;
  const county = req.query.county as string;
  const countryData = ct.getCountry(country);
  const stateData = countryData ? countryData.states[county] : null;
  const cities = stateData ? stateData.cities : [];
  res.json(cities);
});

app.listen(port, () => {
  console.log(`API server running at http://localhost:${port}`);
});
