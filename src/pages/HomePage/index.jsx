import { useEffect, useState } from 'react';
import { Form } from '../../components/Form/Form';
import './style.css';
import React from 'react';

import { createClient } from '@supabase/supabase-js';
import { DayDetail } from '../../components/DayDetail/DayDetail';
const supabaseUrl = import.meta.env.VITE_DB_URL;
const supabaseKey = import.meta.env.VITE_API_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export const HomePage = () => {
  const [isFormVisible, setFormVisible] = useState(false);

  const toggleFormVisibility = () => {
    setFormVisible(!isFormVisible);
  };

  return (
    <div className="content">
      <h1>Naplánujte si svou ideální dovolenou</h1>
      <h2>
        Vytvořte si vlastní cestovní itinerář a plánujte snadno a přehledně.
      </h2>
      <div id="form">
        {!isFormVisible && (
          <button onClick={toggleFormVisibility} className="btn-plan">
            PLÁNUJ
          </button>
        )}

        {isFormVisible && <Form />}
      </div>
    </div>
  );
};
