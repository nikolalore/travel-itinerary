import './style.css';
import { Weather } from '../Weather/Weather';


export const DayHeader = ({title, day, coordinatesY, coordinatesX, date, formattedDate }) => {
  return (
    <div className="day-header">
    <div className="left-section">
      <button className="back-button">&#8249;</button>
      <div className="text-container">
        <div className="title-and-day">
          <h1 className="title">{title} - </h1>
          <span className="day">{day}</span>
        </div>
        <span className="date">{formattedDate}</span>
      </div>
    </div>
    <Weather coordinatesY={coordinatesY} coordinatesX={coordinatesX} date={date}/>
  </div>
  );
};
