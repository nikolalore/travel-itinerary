import './style.css';

export const EventDrawer = ({ opened, onClose }) => {
  if (!opened) {
    return null;
  }

  return (
    <div className="mask" onClick={onClose}>
      <div className="modal-window">
        <h1>Tadyto je jeden pořádný modál</h1>
      </div>
    </div>
  );
};
