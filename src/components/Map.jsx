import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";

function Map() {
  const position = [51.505, -0.09];

  return (
    <div className="map-container">
      <MapContainer center={position} zoom={13}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
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

export default Map;
