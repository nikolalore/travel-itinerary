// import React from 'react';
// import './style.css';

// export const OneDay = ({ day, options }) => {
//   return (
//     <button className="day-button">
//       {day.toLocaleDateString('cs-CZ', options)}
//     </button>
//   );
// };

import React from 'react';
import './style.css';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

export const OneDay = ({ day, options, tripId }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    const formattedDay = format(day, 'yyyy-MM-dd'); // Formátování data do URL-přátelského formátu
    navigate(`/trip/${tripId}/day/${formattedDay}`);
  };

  return (
    <button className="day-button" onClick={handleClick}>
      {day.toLocaleDateString('cs-CZ', options)}
    </button>
  );
};
