import { useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './style.css';
import { differenceInDays, eachDayOfInterval } from 'date-fns';

export const Form = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [daysDifference, setDaysDifference] = useState('');
  const [daysInInterval, setDaysInInterval] = useState('');

  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }; //nastavení toho, jak se bude zobrazovat datum

  const handleStartDate = (date) => {
    setStartDate(date);
  };

  const handleEndDate = (date) => {
    setEndDate(date);
  };

  const handleCountry = (e) => {
    setSelectedCountry(e.target.value);
  };

  const setDates = (start, end) => {
    const diffDays = differenceInDays(end, start);
    const intervalDays = eachDayOfInterval({ start, end }); //vrací pole objektů v eng
    setDaysDifference(diffDays + 1);
    setDaysInInterval(intervalDays);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setDates(startDate, endDate);
  };

  return (
    <div>
      <form className="form-container">
        <div>
          <label className="label-country">Vyber zemi:</label>
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
              dateFormat="dd.MM.yyyy"
              selected={startDate}
              onChange={handleStartDate}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              placeholderText="Start Date"
            />
            <span style={{ margin: '0 10px' }}>do</span>
            <ReactDatePicker
              dateFormat="dd.MM.yyyy"
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
        <button onClick={handleSubmit}>Hotovo</button>
      </form>

      <div className="day--list">
        {daysInInterval &&
          daysInInterval.map((day) => (
            <div>{day.toLocaleDateString('cs-CZ', options)} </div>
          ))}
      </div>
    </div>
  );
};
