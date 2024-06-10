import React from 'react';
import './style.css';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

export const OneDay = ({ day, options, tripId, number }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    const formattedDay = format(day, 'yyyy-MM-dd'); // Formátování data do URL-přátelského formátu
    navigate(`/trip/${tripId}/day/${formattedDay}`);
  };

  return (
    <button className="day-button" onClick={handleClick}>
      <div className="day-number"> Den {number}</div>
      <div className="day-flex">
        <div className="day-date">
          {day.toLocaleDateString('cs-CZ', options)}
        </div>
        <div className="day-arrow">
          <img
            src={`/img/arrow.png`}
            alt="arrow"
            className="day-arrow-icon"
          />
        </div>
      </div>
    </button>
  );
};
