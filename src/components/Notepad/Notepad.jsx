import './style.css';
import React, { useState } from 'react';
import { supabase } from '../../db';

export const Notepad = ({ onSubmit, tripId, content }) => {
  const [notepadContent, setNotepadContent] = useState('');
  const [saving, setSaving] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true); // Nastavit stav na ukládání

    try {
      await supabase
        .from('trips')
        .update([
          {
            notepad_content: notepadContent,
          },
        ])
        .eq('id', tripId);
      onSubmit();
    } finally {
      setSaving(false); // Po dokončení ukládání vrátit stav zpět
    }
  };
  
  return (
    <div className="notepad">
      <div className="notepad-header">
        <div className="notepad-headline">Poznámky pro celý výlet</div>
        <button className="notepad-button" type="submit" onClick={handleSubmit}>
        {saving ? 'Ukládám...' : 'Uložit'}
        </button>
      </div>
      <form>
        <textarea
          defaultValue={content}
          onChange={(e) => setNotepadContent(e.target.value)}
          placeholder="&#10;Místo pro poznámky..."
          className="text"
          name="text"
          rows="4"
        ></textarea>
      </form>
    </div>
  );
};
