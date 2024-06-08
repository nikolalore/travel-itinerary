import { Calendar } from '../Calendar/Calendar';
import './style.css';
import 'leaflet/dist/leaflet.css';
import logo from './img/Czechitas-logo.png';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const VITE_WEATHER = 'aZ2usjdVsCxSuCn61JOrElVVMPLiDq6VSc06alcisc4';

const mapyCzUrl = `https://api.mapy.cz/v1/maptiles/basic/256/{z}/{x}/{y}?apikey=${VITE_WEATHER}`;

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
  const czechitasPosition = [48.2046794, 16.3682604];

  return (
    <div className="background-white">
      <h1>Ahoj tady budou widgety</h1>
      <Calendar />
      <main>
        <MapContainer
          center={czechitasPosition}
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
          <Marker position={czechitasPosition}>
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
