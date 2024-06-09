import './style.css';

export const EventDrawer = ({ data, onClose, onChange, onSubmit }) => {
  if (data === null) {
    return null;
  }

  const handleInputChange = (e) => {
    onChange({
      action: data.action,
      event: { ...data.event, [e.target.name]: e.target.value },
    });
  };

  console.log('tady jsou data', data);

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
              value={data.event.location}
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
