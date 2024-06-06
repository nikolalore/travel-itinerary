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
      <h1>Vaše dovolená začíná právě tady</h1>
      <h2>Klikněte a nechte se rázem přenést na své vysněné místo. </h2>
      <div id="form">
        {!isFormVisible && (
          <button onClick={toggleFormVisibility} className="btn-plan">
            PLÁNUJ ↓
          </button>
        )}

        {isFormVisible && <Form />}
      </div>
    </div>
  );
};
