import './style.css';

export const EventDrawer = ({ data, onClose, onChange, onSubmit }) => {
  if (data === null) {
    return null;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "location") {
      onChange({
        ...data,
        event: {
          ...data.event,
          location: {
            ...data.event.location,
            name: value,
          },
        },
      });
    } else {
      onChange({
        ...data,
        event: { ...data.event, [name]: value },
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!data.event.name) {
      alert("Název události je povinný.");
      return;
    }
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
              name="start_time"
              value={data.event.start_time}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Čas do:
            <input
              type="time"
              name="end_time"
              value={data.event.end_time}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Název:
            <input
              type="text"
              name="name"
              value={data.event.name}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Místo:
            <input
              type="text"
              name="location"
              value={data.event.location?.name || ''}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Popis:
            <textarea
              name="description"
              value={data.event.description}
              onChange={handleInputChange}
              className="large-input"
            />
          </label>
          <button type="submit">Uložit</button>
        </form>
      </div>
    </div>
  );
};
