import { useParams } from 'react-router-dom';
import React from 'react';

export const DayDetail = () => {
  const { date } = useParams();

  return (
    <div>
      <h2>Detaily o dni {date}</h2>
    </div>
  );
};
