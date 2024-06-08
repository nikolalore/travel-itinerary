import './style.css';
import React from 'react';

export const Notepad = () => {
  return (
    <div className="notepad">
      <form>
        <textarea
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
        <button className="notepad-button">Odeslat</button>
      </form>
    </div>
  );
};
