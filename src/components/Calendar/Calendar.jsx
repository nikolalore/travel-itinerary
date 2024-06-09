import './style.css';
import React, { useState } from 'react';
import { format } from 'date-fns';
import { useParams } from 'react-router-dom';
import { Event } from '../Event/Event';
import { EventDrawer } from '../EventDrawer/EventDrawer';
import { createPortal } from 'react-dom';
import { supabase } from '../../db';

export const Calendar = ({ events, onRefreshEvents }) => {
  const [drawerData, setDrawerData] = useState(null);

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

  const updateEvent = async (newEvent) => {
    const { data } = await supabase
      .from('calendar_events')
      .update([
        {
          start_time: newEvent.startTime,
          end_time: newEvent.endTime,
          name: newEvent.name,
          location: newEvent.location,
          description: newEvent.description,
          trip_id: tripId,
          date: formattedDate,
        },
      ])
      .eq('id', newEvent.id)
      .select();
  };

  if (!events) {
    return null;
  }

  const handleSubmit = async () => {
    await updateEvent(drawerData.event);
    setDrawerData(null);
    onRefreshEvents();
  };
  console.log(drawerData);

  return (
    <>
      <div className="calendar-headline">{formattedFullDate}</div>
      <div className="calendar">
        <button>Přidat</button>
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
            data={drawerData}
            onClose={() => setDrawerData(null)}
            onChange={(e) => setDrawerData(e)}
            onSubmit={handleSubmit}
          />,
          document.body,
        )}

        <div className="events">
          {events.map((event, index) => (
            <div>
              <Event
                onOpen={() =>
                  setDrawerData({ action: 'update', event: events[index] })
                }
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
