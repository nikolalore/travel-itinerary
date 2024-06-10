import { useState } from 'react';
import { Form } from '../../components/Form/Form';
import './style.css';
import React from 'react';

export const HomePage = () => {
  const [isFormVisible, setFormVisible] = useState(false);

  const toggleFormVisibility = () => {
    setFormVisible(!isFormVisible);
  };

  return (
    <div className="homepage">
      <div className = {!isFormVisible? "content" : "content content-transition"}>
        <h1>Planorama</h1>
        <h2>
          Vytvořte si vlastní cestovní itinerář a náplánujte si svou ideální dovolenou.
        </h2>
        <div id="form">
          {!isFormVisible && (
            <button onClick={toggleFormVisibility} className="btn-plan">
              Plánuj
            </button>
          )}

          {isFormVisible && <Form />}
        </div>
      </div>
    </div>
  );
};
