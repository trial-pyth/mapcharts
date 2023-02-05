import {
  MapContainer,
  TileLayer,
  useMap,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "./map.css";

import { useState, useMemo } from "react";

function LocationMarker() {
  const [position, setPosition] = useState(null);

  console.log(position);
  const map = useMapEvents({
    click() {
      map.locate();
    },
    locationfound(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  return position === null ? null : (
    <Marker position={position}>
      <Popup>Coords: {(position.lat, position.lng)}</Popup>
    </Marker>
  );
}

const Map = () => {
  const [position, setPosition] = useState(null);
  const [toggle, setToggle] = useState(false);
  const getLocation = () => {
    setToggle(!toggle);
  };

  return (
    <>
      <MapContainer
        center={[51.505, -0.09]}
        zoom={13}
        scrollWheelZoom={true}
        style={{ width: "100%", height: "100%" }}
      >
        <TileLayer
          // attribution="© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>"
          url="https://api.mapbox.com/styles/v1/misixi/cldr640yv009w01o5475r1h1s/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoibWlzaXhpIiwiYSI6ImNsY2x3bjU4azBqc2kzcXFxdHBwM2RjdWUifQ.3R7949FlEZ-aGTn4uCzvIw"
        />

        <LocationMarker />
      </MapContainer>
      {/* <button className="getLocation" onClick={getLocation}>
        Get current Location
      </button> */}
    </>
  );
};

export default Map;
