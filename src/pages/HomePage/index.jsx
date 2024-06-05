import { useEffect, useState } from 'react';
import { Form } from '../../components/Form/Form';
import './style.css';
import React from 'react';

import { createClient } from '@supabase/supabase-js';
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
      <div className="content-headline">
        <h1>Naplánujte si svou ideální dovolenou</h1>
      </div>
      <div className="content-subheadline">
        <h2>
          Vytvořte si vlastní cestovní itinerář a plánujte snadno a přehledně.{' '}
        </h2>
      </div>
      <div id="form">
        {!isFormVisible && (
          <button className="btn-plan" onClick={toggleFormVisibility}>
            PLÁNUJ
          </button>
        )}

        {isFormVisible && <Form />}
      </div>
    </div>
  )}
