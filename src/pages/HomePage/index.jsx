import { useState } from 'react';
import { Form } from '../../components/Form/Form';
import './style.css';

export const HomePage = () => {
  const [isFormVisible, setFormVisible] = useState(false);

  const toggleFormVisibility = () => {
    setFormVisible(!isFormVisible);
  };

  return (
    <div>
      <h1>Headline</h1>
      <h2>Subheadline</h2>
      {!isFormVisible && <button onClick={toggleFormVisibility}>
        Plánuj
      </button>}

      {isFormVisible && <Form />}
    </div>
  );
};
