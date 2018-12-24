import Leaflet from "leaflet";
import React from "react";
import { Marker, Popup } from "react-leaflet";
import dhammaHouseIconUrl from "../dhammaHouseIcon.svg";

const dhammaHouseIcon = Leaflet.icon({
  iconUrl: dhammaHouseIconUrl,
  iconSize: [30, 30]
});

export class DhammaHouseMarker extends React.Component {
  static coordinates = { lat: 40.7544, lng: -73.9905 };

  render() {
    return (
      <Marker icon={dhammaHouseIcon} position={DhammaHouseMarker.coordinates}>
        <Popup>
          <a target="_blank" href="https://www.ny.us.dhamma.org/">
            NYC Dhamma House
          </a>
          <br />
          <br />
          247 W 38th St #1003
          <br />
          New York, NY 10018
        </Popup>
      </Marker>
    );
  }
}
export default DhammaHouseMarker;
