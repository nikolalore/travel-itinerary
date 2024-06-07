import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { eachDayOfInterval } from 'date-fns';
import './style.css';
import { OneDay } from '../OneDay/OneDay';
import { Header } from '../Header/Header';

const supabaseUrl = import.meta.env.VITE_DB_URL;
const supabaseKey = import.meta.env.VITE_API_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export const DateResult = () => {
  const { id } = useParams(); //můžu do URL cesty vložit proměnnou
  const [trip, setTrip] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [daysInTrip, setDaysInTrip] = useState([]);
  const [countryCode, setCountryCode] = useState(null);

  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }; //nastavení toho, jak se bude zobrazovat datum

  useEffect(() => {
    const fetchTrip = async () => {
      const { data } = await supabase.from('trips').select().eq('id', id);

      setTrip(data[0]); // Předpokládáme, že vrácený záznam je první v poli
      setStartDate(data[0].start_date);
      setEndDate(data[0].end_date);
      setCountryCode(data[0].country);
    };

    fetchTrip();
  }, [id]);

  useEffect(() => {
    if (startDate && endDate) {
      setDatesInterval(startDate, endDate);
    }
  }, [startDate, endDate]);

  const setDatesInterval = (start, end) => {
    const intervalDays = eachDayOfInterval({ start, end });
    setDaysInTrip(intervalDays);
  };

  if (!trip) {
    return <div>Loading...</div>;
  }

  return (
    trip && (
      <div className="background-white">
        <Header
          countryImage={`/countriesData/img/${countryCode}.jpg`}
          country={countryCode}
          startDate={startDate}
          endDate={endDate}
        />
        <div className="day-list">
          {daysInTrip.map((day, index) => (
            <OneDay key={index} day={day} options={options} tripId={id} />
          ))}
        </div>
      </div>
    )
  );
};
