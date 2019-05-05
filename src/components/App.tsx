import React, { Suspense } from "react";
import { Map, TileLayer } from "react-leaflet";
// @ts-ignore todo
import { appContainer, mapContainer } from "./App.module.css";
import DhammaHouseMarker from "./DhammaHouseMarker";
import HoveredRegionInfoBox from "./HoveredRegionInfoBox";
import GroupSittingMarker from "./GroupSittingMarker";
import MapLegend from "./MapLegend";

import { IRegionGeoJSON, IGroupSitting } from "../types";
import groupSittingsJSON from "../data/gitignored/groupSittings.json";

const RegionLayer = React.lazy(() => import("./RegionLayer"));
const groupSittings: IGroupSitting[] = groupSittingsJSON;

const accessToken =
  "pk.eyJ1Ijoibnl2YSIsImEiOiJjanJ3dWVud3kwZ3BwNDRvOGNyOHdsYnVrIn0.t7R_ElgMs18HNgvj3swziQ";

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
            url={`https://api.mapbox.com/styles/v1/nyva/cjsg3abro31p81fmmn4s628ze/tiles/{z}/{x}/{y}?access_token=${accessToken}`}
          />
          <Suspense fallback={null}>
            <RegionLayer
              hoveredRegion={hoveredRegion}
              setHoveredRegion={this.setHoveredRegion}
            />
          </Suspense>
          {groupSittings.map((groupSitting, index) => (
            <GroupSittingMarker key={index} groupSitting={groupSitting} />
          ))}
          <DhammaHouseMarker />
        </Map>
        <HoveredRegionInfoBox hoveredRegion={hoveredRegion} />
        <MapLegend />
      </div>
    );
  }
}
