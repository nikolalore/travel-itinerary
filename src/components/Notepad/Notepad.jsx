import './style.css';
import React, { useState } from 'react';

import { createClient } from '@supabase/supabase-js';
const supabaseUrl = import.meta.env.VITE_DB_URL;
const supabaseKey = import.meta.env.VITE_API_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export const Notepad = ({ onSubmit, tripId, content }) => {
  const [notepadContent, setNotepadContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await supabase
      .from('trips')
      .update([
        {
          notepad_content: notepadContent,
        },
      ])
      .eq('id', tripId);
    onSubmit();
   
  };
  console.log(content)
  return (
    <div className="notepad">
      <form>
        <textarea
        value={content}
          onChange={(e) => setNotepadContent(e.target.value)}
          placeholder="&#10;Místo pro poznámky..."
          className="text"
          name="text"
          rows="4"
          style={{
            overflow: 'hidden',
            wordWrap: 'break-word',
            resize: 'none',
            height: '160px',
          }}
        ></textarea>
        <br />
        <button className="notepad-button" type="submit" onClick={handleSubmit}>
          Odeslat
        </button>
      </form>
    </div>
  );
};