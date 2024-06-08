import './style.css';
import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { format } from 'date-fns';
import { useParams } from 'react-router-dom';
import { Event } from '../Event/Event';

const supabaseUrl = import.meta.env.VITE_DB_URL;
const supabaseKey = import.meta.env.VITE_API_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export const Calendar = ({ events, onSubmit }) => {
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

  const addEvent = async (newEvent) => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newEvent = { ...formData, hour: currentHour };
    setShowForm(false);
    setFormData({
      startTime: '',
      endTime: '',
      name: '',
      location: '',
      description: '',
    });
    await addEvent(newEvent);
    onSubmit();
  };

  return (
    <div className="calendar">
      <div className="hours">
        {Array.from({ length: 24 }, (_, i) => (
          <div key={i} className="hour" onClick={() => handleCalendarClick(i)}>
            {i < 10 ? `0${i}:00` : `${i}:00`}
            <span></span>
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
          <div className="event">
            <Event
              key={index}
              name={event.name}
              description={event.description}
              startTime={event.start_time}
              endTime={event.end_time}
              location={event.location}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
