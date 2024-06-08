import './style.css';

export const Event = ({ name, description, startTime, endTime, location }) => {
  return (
    <div className="event">
      <div className="event-name">{name}</div>
      <div className="event-startTime">{startTime}</div> <span></span>{' '}
      <div className="event-endTime">{endTime}</div>
      <div className="event-location">{location}</div>
      <div className="event-description">{description}</div>
    </div>
  );
};
