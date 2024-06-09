import './style.css';

export const Header = ({ countryImage, country, startDate, endDate }) => {
  return (
    <div className="header" style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.55),
    rgba(0, 0, 0, 0.3)), url(${countryImage})` }}>
      <h1>{country}</h1>
      <h2>{`${startDate} - ${endDate}`}</h2>
    </div>
  );
};
