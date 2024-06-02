import { useState } from 'react';
import { Form } from '../../components/Form/Form';
import './style.css';

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
          <button onClick={toggleFormVisibility}>PLÁNUJ ↓</button>
        )}

        {isFormVisible && <Form />}
      </div>
    </div>
  );
};
