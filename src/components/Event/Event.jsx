import './style.css';
import { parse, differenceInMinutes, format } from 'date-fns';

export const Event = ({ name, startTime, endTime, date, onOpen }) => {
  const start = parse(startTime, 'HH:mm:ss', new Date(date));
  const end = parse(endTime, 'HH:mm:ss', new Date(date));
  const durationInMinutes = differenceInMinutes(end, start);

  const startHours = start.getHours();
  const startMinutes = start.getMinutes();
  const startInMinutes = startHours * 60 + startMinutes;

  return (
    <div
      className="event"
      style={{ height: durationInMinutes, top: startInMinutes }}
      onClick={onOpen}
    >
      <div className="event-name">{name}</div>
    </div>
  );
};
