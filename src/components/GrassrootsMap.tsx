import React from "react";
import { Map, TileLayer } from "react-leaflet";
import { mapContainer } from "./GrassrootsMap.css";
import DhammaHouseMarker from "./DhammaHouseMarker";
import RegionLayer from "./RegionLayer";

const accessToken =
  "pk.eyJ1IjoibmF0YW5pYmFyIiwiYSI6ImNqa2FnMTM5ajM1ajYzbG50dXptMDhjcDIifQ.Dae3BHZd9sexPOk_d76O1g";

export default class GrassrootsMap extends React.Component {
  render() {
    return (
      <Map
        className={mapContainer}
        center={DhammaHouseMarker.coordinates}
        zoom={11}
      >
        <TileLayer
          attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
          maxZoom={18}
          url={`https://api.mapbox.com/styles/v1/natanibar/cjkbf9gr8019f2rqllw7uz3ep/tiles/{z}/{x}/{y}?access_token=${accessToken}`}
        />
        <RegionLayer />
        <DhammaHouseMarker />
      </Map>
    );
  }
}
