import React from "react";
import { Map, TileLayer } from "react-leaflet";
// @ts-ignore todo
import { appContainer, mapContainer } from "./App.css";
import DhammaHouseMarker from "./DhammaHouseMarker";
import HoveredRegionInfoBox from "./HoveredRegionInfoBox";
import RegionLayer from "./RegionLayer/index";
import { IRegionGeoJSON } from "../types/index";

const accessToken =
  "pk.eyJ1IjoibmF0YW5pYmFyIiwiYSI6ImNqa2FnMTM5ajM1ajYzbG50dXptMDhjcDIifQ.Dae3BHZd9sexPOk_d76O1g";

interface IState {
  hoveredRegion: null | IRegionGeoJSON;
}

export default class App extends React.Component<{}, IState> {
  state = {
    hoveredRegion: null
  };

  setHoveredRegion = (hoveredRegion: IState["hoveredRegion"]) => {
    this.setState({ hoveredRegion });
  };

  render() {
    const { hoveredRegion } = this.state;

    return (
      <div className={appContainer}>
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
          <RegionLayer
            hoveredRegion={hoveredRegion}
            setHoveredRegion={this.setHoveredRegion}
          />
          <DhammaHouseMarker />
        </Map>
        <HoveredRegionInfoBox hoveredRegion={hoveredRegion} />
      </div>
    );
  }
}
