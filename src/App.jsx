import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";
import "./index.css";

function App() {
  const position = [51.505, -0.09];

  return (
    <div className="map-container">
      <MapContainer center={position} zoom={13}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
        <ClickPosition />
      </MapContainer>
    </div>
  );
}

function ClickPosition() {
  useMapEvents({
    click: (e) => {
      console.log(e);
    },
  });

  return null;
}

export default App;
