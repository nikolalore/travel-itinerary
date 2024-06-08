import './style.css';
import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { format } from 'date-fns';
import { useParams } from 'react-router-dom';
const supabaseUrl = import.meta.env.VITE_DB_URL;
const supabaseKey = import.meta.env.VITE_API_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export const Calendar = () => {
  const [events, setEvents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [currentHour, setCurrentHour] = useState(null);
  const [formData, setFormData] = useState({
    startTime: '',
    endTime: '',
    name: '',
    location: '',
    description: '',
  });

  const { tripId } = useParams();
  const { date } = useParams();
  const formattedDate = format(date, 'yyyy/MM/dd');

  const handleCalendarClick = (hour) => {
    setCurrentHour(hour);
    setShowForm(true);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newEvent = { ...formData, hour: currentHour };
    setEvents([...events, newEvent]);
    setShowForm(false);
    setFormData({
      startTime: '',
      endTime: '',
      name: '',
      location: '',
      description: '',
    });

    const { data } = await supabase
      .from('calendar_events')
      .insert([
        {
          start_time: newEvent.startTime,
          end_time: newEvent.endTime,
          name: newEvent.name.toString(),
          location: formData.location.toString(),
          description: formData.description.toString(),
          trip_id: tripId,
          date: formattedDate,
        },
      ])
      .select();
  };

  const findEvent = (i) => {
    const formattedIndex = i > 10 ? i.toString() : `0${i.toString()}`;
    if (events.length === 0) return '';
    const currentEvent = events.find(
      (event) => event.startTime.split(':')[0] === formattedIndex,
    );
    if (currentEvent === undefined) return '';
    return currentEvent.name;
  };

  return (
    <div className="calendar">
      <div className="hours">
        {Array.from({ length: 24 }, (_, i) => (
          <div key={i} className="hour" onClick={() => handleCalendarClick(i)}>
            {i < 10 ? `0${i}:00` : `${i}:00`}
            <span></span>
            <div className="event">{findEvent(i)}</div>
          </div>
        ))}
      </div>

      {showForm && (
        <form className="event-form" onSubmit={handleSubmit}>
          <label>
            Čas od:
            <input
              type="time"
              name="startTime"
              value={formData.startTime}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Čas do:
            <input
              type="time"
              name="endTime"
              value={formData.endTime}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Název:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Místo:
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Popis:
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
            />
          </label>
          <button type="submit">Uložit</button>
        </form>
      )}

      <div className="events">
        {events.map((event, index) => (
          <div key={index} className="event" style={{ top: event.hour * 50 }}>
            <div className="event-details">
              <p>
                {event.startTime} - {event.endTime}
              </p>
              <p>{event.location}</p>
              <p>{event.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
