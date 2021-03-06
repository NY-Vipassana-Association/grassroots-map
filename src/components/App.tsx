import React, { Suspense } from "react";
import { Map, TileLayer } from "react-leaflet";
import ReactDOMServer from "react-dom/server";

// @ts-ignore todo
import { appContainer, mapContainer } from "./App.module.css";
import DhammaHouseMarker from "./DhammaHouseMarker";
import HoveredRegionInfoBox from "./HoveredRegionInfoBox";
import GroupSittingMarker from "./GroupSittingMarker";
import MapLegend from "./MapLegend";
import metadataJSON from "../data/gitignored/metadata.json";

import { IRegionGeoJSON, IGroupSitting } from "../types";
import groupSittingsJSON from "../data/gitignored/groupSittings.json";

const RegionLayer = React.lazy(() => import("./RegionLayer"));
const groupSittings: IGroupSitting[] = groupSittingsJSON;

const accessToken =
  "pk.eyJ1Ijoibnl2YSIsImEiOiJjanJ3dWVud3kwZ3BwNDRvOGNyOHdsYnVrIn0.t7R_ElgMs18HNgvj3swziQ";

interface IState {
  hoveredRegion: null | IRegionGeoJSON;
}

const formatLastUpdatedDate = (date: Date) => {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  const year = date.getFullYear();
  const month = date.getMonth();

  return `${monthNames[month]}, ${year}`;
};

const getLastUpdatedDate = () =>
  formatLastUpdatedDate(
    new Date(metadataJSON.all_county_student_counts__last_updated)
  );

const Attribution = () => {
  return (
    <span>
      <span>
        Map data &copy;{" "}
        <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors,{" "}
        <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>,
        Imagery © <a href="https://www.mapbox.com/">Mapbox</a>.{" "}
      </span>
      <span>
        Counts are of old students of Vipassana as taught by S.N. Goenka in the
        North American Old Student Database, as of {getLastUpdatedDate()}.
        Student counts do not include any personal information.
      </span>
    </span>
  );
};

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
            attribution={ReactDOMServer.renderToStaticMarkup(<Attribution />)}
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
