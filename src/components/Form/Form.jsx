import { useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './style.css';
import { cs } from 'date-fns/locale/cs';
import { useNavigate } from 'react-router-dom';
import React from 'react';

import { createClient } from '@supabase/supabase-js';
const supabaseUrl = import.meta.env.VITE_DB_URL;
const supabaseKey = import.meta.env.VITE_API_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

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

    const { data } = await supabase
      .from('trips')
      .insert([
        {
          start_date: startDate,
          end_date: endDate,
          country: selectedCountry,
        },
      ])
      .select(); //select() vrací hodnoty vložené do databáze tak, abychom z nich mohli vytáhnout id

    // if (error) {
    //   console.error('Chyba při vkládání dat do databáze:', error);
    //   return;
    // }

    const tripId = data[0].id; // tohle je ID vyplněného tripu, [0] získává první položku z vrácených dat, což v tomhle případě odpovídá nově vložené cestě, .id –> získávám konkrétní id z nového tripu
    navigate(`/results/${tripId}`);
  };

  return (
    <div>
      <form className="form-container" onSubmit={handleSubmit}>
        <div>
          <label className="label-country">Vyber zemi:</label>
          <select
            id="countries"
            value={selectedCountry}
            onChange={handleCountry}
          >
            <option value="">Vyberte</option>
            <option value="anglie">Anglie</option>
            <option value="belgie">Belgie</option>
            <option value="spanelsko">Španělsko</option>
          </select>
        </div>
        <div>
          <label>Zadejte datum:</label>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <ReactDatePicker
              locale={cs}
              dateFormat="dd.MM.yyyy"
              selected={startDate}
              onChange={handleStartDate}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              placeholderText="Začátek"
            />
            <span style={{ margin: '0 10px' }}>do</span>
            <ReactDatePicker
              locale={cs}
              dateFormat="dd.MM.yyyy"
              selected={endDate}
              onChange={handleEndDate}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              placeholderText="Konec"
            />
          </div>
        </div>
        <button type="submit">Hotovo</button>
      </form>
    </div>
  );
};
