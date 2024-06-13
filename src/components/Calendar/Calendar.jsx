import './style.css';
import React, { useEffect, useRef, useState } from 'react';
import { format } from 'date-fns';
import { useParams } from 'react-router-dom';
import { Event } from '../Event/Event';
import { EventDrawer } from '../EventDrawer/EventDrawer';
import { createPortal } from 'react-dom';
import { supabase } from '../../db';

const { VITE_MAP } = import.meta.env;

export const Calendar = ({ events, onRefreshEvents }) => {
  const [drawerData, setDrawerData] = useState(null);
  const eightOclockRef = useRef(null);

  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  useEffect(() => {
    if (eightOclockRef.current) {
      eightOclockRef.current.scrollIntoView({ behavio: 'smooth' });
    }
  }, []);

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
          start_time: newEvent.start_time,
          end_time: newEvent.end_time,
          name: newEvent.name,
          location: newEvent.location || null,
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

  const insertEvent = async (newEvent) => {
    const { data } = await supabase
      .from('calendar_events')
      .insert([
        {
          start_time: newEvent.start_time,
          end_time: newEvent.end_time,
          name: newEvent.name,
          location: newEvent.location || null,
          description: newEvent.description,
          trip_id: tripId,
          date: formattedDate,
        },
      ])
      .select();
  };

  const fetchEventLocationCoordinates = async (location) => {
    if (!location) {
      return null;
    }
    const response = await fetch(
      `https://api.mapy.cz/v1/geocode?query=${location}&lang=cs&limit=1&type=regional&type=poi&apikey=${VITE_MAP}`,
    );
    const data = await response.json();
    console.log(data);
    return { x: data.items[0].position.lon, y: data.items[0].position.lat };
  };

  const handleSubmit = async () => {
    let coordinates = { x: null, y: null };
    if (drawerData.event.location.name) {
      const fetchedCoordinates = await fetchEventLocationCoordinates(
        drawerData.event.location.name,
      );
      if (fetchedCoordinates) {
        coordinates = fetchedCoordinates;
      }
    }

    const eventToSave = {
      ...drawerData.event,
      location: drawerData.event.location.name
        ? {
            x: coordinates.x,
            y: coordinates.y,
            name: drawerData.event.location.name,
          }
        : null, // Nastavení location na null, pokud není zadáno
    };

    if (drawerData.action === 'insert') {
      await insertEvent(eventToSave);
    } else {
      await updateEvent(eventToSave);
    }
    setDrawerData(null);
    onRefreshEvents();
  };

  const handleNewEvent = () => {
    setDrawerData({
      action: 'insert',
      event: {
        start_time: '',
        end_time: '',
        name: '',
        location: {
          name: '',
          x: null,
          y: null,
        },
        description: '',
      },
    });
  };

  return (
    <div className="calendar-box">
      <div className="calendar-header">
        <div className="calendar-headline">Moje aktivity</div>
        <button className="add-btn" onClick={handleNewEvent}>
          +
        </button>
      </div>
      <div className="calendar">
        <div className="hours">
          {Array.from({ length: 24 }, (_, i) => (
            <div
              key={i}
              className="hour"
              onClick={() => handleCalendarClick(i)}
              ref={i === 8 ? eightOclockRef : null}
            >
              {i < 10 ? `0${i}:00` : `${i}:00`}
              <span> </span>
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
    </div>
  );
};
