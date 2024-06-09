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

  const { tripId, date } = useParams();

  const fetchDayDetail = async () => {
    const { data } = await supabase
      .from('trips')
      .select(
        `country, country_name, coordinates,notepad_content,
     calendar_events(id, date, start_time, end_time, name, location, description)`,
      )
      .eq('id', tripId)
      .eq('calendar_events.date', date);
    setTripData(data[0]);
  };

  useEffect(() => {
    fetchDayDetail();
  }, []);

  const handleSubmit = () => {
    fetchDayDetail();
  };

  if (tripData === 'loading') {
    return <div>Načítám</div>;
  }

  const handleRefreshEvents = () => {
    fetchDayDetail();
  };

  return (
    <div className="background-white">
      <h1>Ahoj, tady už se objevují widgety</h1>
      <Weather
        date={date}
        coordinatesY={tripData.coordinates.y}
        coordinatesX={tripData.coordinates.x}
      />
      <Notepad
        onSubmit={handleSubmit}
        tripId={tripId}
        content={tripData.notepad_content}
      />
      <Calendar
        events={tripData.calendar_events}
        onSubmit={handleSubmit}
        onRefreshEvents={handleRefreshEvents}
      />
      <main>
        <MapContainer
          center={[tripData.coordinates.y, tripData.coordinates.x]}
          zoom={15}
          scrollWheelZoom={false}
        >
          <TileLayer
            minZoom={0}
            maxZoom={19}
            attribution='<a href="https://api.mapy.cz/copyright" target="_blank">© Seznam.cz a.s. a další</a>'
            url={mapyCzUrl}
          />
          <LogoControl />
          <Marker position={[tripData.coordinates.y, tripData.coordinates.x]}>
            <Popup>
              <div>
                <img src={logo} alt="Logo Czechitas" width={100} />
              </div>
            </Popup>
          </Marker>
        </MapContainer>
      </main>
    </div>
  );
};
