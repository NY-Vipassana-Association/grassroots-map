import React from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import { mapContainer } from "./GrassrootsMap.css";

const dhammaHouseCoordinates = { lat: 40.7544, lng: -73.9905 };

const accessToken =
  "pk.eyJ1IjoibmF0YW5pYmFyIiwiYSI6ImNqa2FnMTM5ajM1ajYzbG50dXptMDhjcDIifQ.Dae3BHZd9sexPOk_d76O1g";

export default class GrassrootsMap extends React.Component {
  render() {
    return (
      <Map className={mapContainer} center={dhammaHouseCoordinates} zoom={13}>
        <TileLayer
          attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
          maxZoom={18}
          url={`https://api.mapbox.com/styles/v1/natanibar/cjkbf9gr8019f2rqllw7uz3ep/tiles/{z}/{x}/{y}?access_token=${accessToken}`}
        />
      </Map>
    );
  }
}
