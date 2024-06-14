import { useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './style.css';
import { cs } from 'date-fns/locale/cs';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import { format } from 'date-fns';
import { countriesData } from '../../../public/countriesData/countriesData';
import { supabase } from '../../db';

export const Form = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState('');

  const navigate = useNavigate(); //pro navigaci na novou stránku dle id v URL

  const handleStartDate = (date) => {
    setStartDate(date);
  };

  const handleEndDate = (date) => {
    setEndDate(date);
  };

  const handleCountry = (e) => {
    setSelectedCountry(e.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formattedStartDate = format(startDate, 'yyyy/MM/dd');
    const formattedEndDate = format(endDate, 'yyyy/MM/dd');
    const formattedCountry = selectedCountry.toString();

    const countryData = countriesData.find(
      (country) => country.code === selectedCountry,
    );

    const { data } = await supabase
      .from('trips')
      .insert([
        {
          start_date: formattedStartDate,
          end_date: formattedEndDate,
          country: formattedCountry,
          coordinates: countryData.capitalCoords,
          country_name: countryData.name.toString(),
        },
      ])
      .select(); 

    const tripId = data[0].id; 
    navigate(`/trip/${tripId}`);
  };

  return (
    <div>
      <form className="form-container" onSubmit={handleSubmit}>
        <div>
          <label className="label-country">Kam se chystáte?</label>
          <select
            id="countries"
            value={selectedCountry}
            onChange={handleCountry}
          >
            <option value="">Vyberte</option>
            {countriesData.map((country) => (
              <option
                id="responsive-option"
                key={country.code}
                value={country.code}
              >
                {country.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="label-date">Zadejte termín vaší dovolené:</label>
          <div className="date-container">
            <div
              className="responsive-layer"
              style={{ display: 'flex', alignItems: 'center' }}
            >
              <ReactDatePicker
                locale={cs}
                dateFormat="dd.MM.yyyy"
                selected={startDate}
                onChange={handleStartDate}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                placeholderText="Od"
                className="date-picker"
              />
              <span style={{ margin: '10px 10px' }}></span>
              <ReactDatePicker
                locale={cs}
                dateFormat="dd.MM.yyyy"
                selected={endDate}
                onChange={handleEndDate}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
                placeholderText="Do"
                className="date-picker"
              />
            </div>
          </div>
        </div>
        <div className="button-container">
          <button className="btn-submit" type="submit">
            Hotovo
          </button>
        </div>
      </form>
    </div>
  );
};
