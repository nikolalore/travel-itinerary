import './style.css';

export const Header = ({ countryImage, country, startDate, endDate }) => {
  return (
    <div className="header" style={{ backgroundImage: `url(${countryImage})` }}>
      <h1>{country}</h1>
      <h2>{`${startDate} - ${endDate}`}</h2>
    </div>
  );
};
