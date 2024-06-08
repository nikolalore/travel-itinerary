import './style.css';
import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { format } from 'date-fns';
import { useParams } from 'react-router-dom';
import { Event } from '../Event/Event';
import { EventDrawer } from '../EventDrawer/EventDrawer';
import { createPortal } from 'react-dom';

const supabaseUrl = import.meta.env.VITE_DB_URL;
const supabaseKey = import.meta.env.VITE_API_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export const Calendar = ({ events }) => {
  const [selectedEvent, setSelectedEvent] = useState(null);

  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  const { tripId } = useParams();
  const { date } = useParams();
  const formattedDate = format(date, 'yyyy/MM/dd');
  const tripDate = new Date(date);
  const formattedFullDate = tripDate.toLocaleDateString('cs-CZ', options);

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

  if (!events) {
    return null;
  }

  const handleSubmit = () => {
    console.log(selectedEvent);
  };

  return (
    <>
      <div className="calendar-headline">{formattedFullDate}</div>
      <div className="calendar">
        <div className="hours">
          {Array.from({ length: 24 }, (_, i) => (
            <div
              key={i}
              className="hour"
              onClick={() => handleCalendarClick(i)}
            >
              {i < 10 ? `0${i}:00` : `${i}:00`}
              <span></span>
            </div>
          ))}
        </div>

        {createPortal(
          <EventDrawer
            event={selectedEvent}
            onClose={() => setSelectedEvent(null)}
            onChange={(e) => setSelectedEvent(e)}
            onSubmit={handleSubmit}
          />,
          document.body,
        )}

        <div className="events">
          {events.map((event, index) => (
            <div>
              <Event
                onOpen={() => setSelectedEvent(events[index])}
                key={index}
                name={event.name}
                description={event.description}
                startTime={event.start_time}
                endTime={event.end_time}
                location={event.location}
                date={event.date}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
