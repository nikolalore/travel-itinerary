import { useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export const Form = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState('');

  const handleStartDate = (date) => {
    setStartDate(date);
  };

  const handleEndDate = (date) => {
    setEndDate(date);
  };

  const handleCountry = (e) => {
    setSelectedCountry(e.target.value);
  };

  return (
    <div>
      <form>
        <div>
          <label>Vyber zemi:</label>
          <select
            id="countries"
            value={selectedCountry}
            onChange={handleCountry}
          >
            <option value="">Vyberte</option>
            <option value="anglie">Anglie</option>
            <option value="belgie">Belgie</option>
            <option value="spanelsko">Španělsko</option>
          </select>
        </div>
        <div>
          <label>Zadejte datum:</label>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <ReactDatePicker
              selected={startDate}
              onChange={handleStartDate}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              placeholderText="Start Date"
            />
            <span style={{ margin: '0 10px' }}>do</span>
            <ReactDatePicker
              selected={endDate}
              onChange={handleEndDate}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              placeholderText="End Date"
            />
          </div>
        </div>
        <button>Hotovo</button>
      </form>
    </div>
  );
};
