import { Calendar } from '../Calendar/Calendar';
import './style.css';
import 'leaflet/dist/leaflet.css';
import logo from './img/Czechitas-logo.png';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Notepad } from '../Notepad/Notepad';
import { supabase } from '../../db';
import { Weather } from '../Weather/Weather';
import { DayHeader } from '../DayHeader/DayHeader';
import { differenceInDays } from 'date-fns/differenceInDays';

const { VITE_MAP } = import.meta.env;

const mapyCzUrl = `https://api.mapy.cz/v1/maptiles/basic/256/{z}/{x}/{y}?apikey=${VITE_MAP}`;

const POSITION_CLASSES = {
  bottomleft: 'leaflet-bottom leaflet-left',
  bottomright: 'leaflet-bottom leaflet-right',
  topleft: 'leaflet-top leaflet-left',
  topright: 'leaflet-top leaflet-right',
};

const LogoControl = ({ position }) => {
  const positionClass =
    (position && POSITION_CLASSES[position]) || POSITION_CLASSES.bottomleft;
  return (
    <div className={positionClass}>
      <div className="leaflet-control">
        <a href="https://mapy.cz/" target="_blank">
          <img src="https://api.mapy.cz/img/api/logo.svg" />
        </a>
      </div>
    </div>
  );
};

export const DayDetail = () => {
  const [tripData, setTripData] = useState('loading');
  const [dayOfTrip, setDayOfTrip] = useState(null);
  const { tripId, date } = useParams();

  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  const tripDate = new Date(date);
  const formattedDate = tripDate.toLocaleDateString('cs-CZ', options);

  const fetchDayDetail = async () => {
    const { data } = await supabase
      .from('trips')
      .select(
        `country, country_name, coordinates,notepad_content, start_date,
     calendar_events(id, date, start_time, end_time, name, location, description)`,
      )
      .eq('id', tripId)
      .eq('calendar_events.date', date);
    setTripData(data[0]);
    const currentDate = new Date(date);
    const startDate = new Date(data[0].start_date);
    setDayOfTrip(differenceInDays(currentDate, startDate) + 1);
  };

  useEffect(() => {
    fetchDayDetail();
  }, []);

  if (tripData === 'loading') {
    return <div>Načítám</div>;
  }

  const handleRefreshEvents = () => {
    fetchDayDetail();
  };

  return (
    <div className="background-white">
      <DayHeader
        title={tripData.country_name}
        day={`Den ${dayOfTrip}`}
        formattedDate={formattedDate}
        date={date}
        coordinatesY={tripData.coordinates.y}
        coordinatesX={tripData.coordinates.x}
      />
      <div className="widgets">
        <div className="widgets-calendar">
          <Calendar
            events={tripData.calendar_events}
            onRefreshEvents={handleRefreshEvents}
          />
        </div>
        <div className="widgets-right">
          <div className="widgets-notepad">
            <Notepad
              onSubmit={handleRefreshEvents}
              tripId={tripId}
              content={tripData.notepad_content}
            />
          </div>
          <div className="widgets-map">
            <MapContainer
              center={[tripData.coordinates.y, tripData.coordinates.x]}
              zoom={10}
              scrollWheelZoom={false}
            >
              <TileLayer
                minZoom={0}
                maxZoom={19}
                attribution='<a href="https://api.mapy.cz/copyright" target="_blank">© Seznam.cz a.s. a další</a>'
                url={mapyCzUrl}
              />
              <LogoControl />
              <Marker
                position={[tripData.coordinates?.y, tripData.coordinates?.x]}
                icon={L.icon({
                  iconUrl: '/img/marker.png',
                  iconSize: [25, 41],
                })}
              >
                <Popup>
                  <div>
                    <strong>{tripData.country_name}</strong>
                  </div>
                </Popup>
              </Marker>
              {tripData.calendar_events.length > 0 &&
                tripData.calendar_events.map(
                  (event) =>
                    event.location?.name &&
                    event.location?.y &&
                    event.location?.x && (
                      <Marker
                        key={event.location.name}
                        position={[event.location.y, event.location.x]}
                        icon={L.icon({
                          iconUrl: '/img/marker.png',
                          iconSize: [25, 41],
                        })}
                      >
                        <Popup>
                          <div>
                            <strong>{event.name}</strong>
                            <p>{event.description}</p>
                          </div>
                        </Popup>
                      </Marker>
                    ),
                )}
            </MapContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
