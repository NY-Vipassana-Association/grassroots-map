import React from "react";
import { GeoJSON } from "react-leaflet";

import nycBoroughsJSON from "../nycBoroughs.json";
import { IRegionFeatureCollection } from "../types";

const nycBoroughsData = nycBoroughsJSON as IRegionFeatureCollection;

export default class RegionGeoJSONLayer extends React.Component {
  render() {
    return <GeoJSON data={nycBoroughsData} />;
  }
}
