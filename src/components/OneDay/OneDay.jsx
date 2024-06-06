import React from 'react';
import './style.css';

export const OneDay = ({ day, options }) => {
  return (
    <button className="day-button">
      {day.toLocaleDateString('cs-CZ', options)}
    </button>
  );
};
