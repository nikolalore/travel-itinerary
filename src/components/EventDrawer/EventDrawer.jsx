import { useState } from 'react';
import './style.css';

export const EventDrawer = ({ event, onClose, onChange, onSubmit }) => {
  if (event === null) {
    return null;
  }

  const updateEvents = async (event) => {
    const { data } = await supabase
      .from('calendar_events')
      .update([
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

  const handleInputChange = (e) => {
    onChange({ ...event, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <div className="mask" onClick={onClose}>
      <div className="modal-window" onClick={(e) => e.stopPropagation()}>
        <form className="event-form" onSubmit={handleSubmit}>
          <label>
            Čas od:
            <input
              type="time"
              name="startTime"
              value={event.start_time}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Čas do:
            <input
              type="time"
              name="endTime"
              value={event.end_time}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Název:
            <input
              type="text"
              name="name"
              value={event.name}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Místo:
            <input
              type="text"
              name="location"
              value={event.location}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Popis:
            <input
              type="text"
              name="description"
              value={event.description}
              onChange={handleInputChange}
            />
          </label>
          <button type="submit">Uložit</button>
        </form>
      </div>
    </div>
  );
};
