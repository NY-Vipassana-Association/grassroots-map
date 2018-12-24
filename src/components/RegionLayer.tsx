import React from "react";
import { GeoJSON, Popup } from "react-leaflet";

import nycBoroughsJSON from "../nycBoroughs.json";
import { IRegionFeatureCollection } from "../types";

const nycBoroughsData = nycBoroughsJSON as IRegionFeatureCollection;

export default class RegionGeoJSONLayer extends React.Component {
  render() {
    return (
      <GeoJSON data={nycBoroughsData}>
        <Popup>
          <p>
            <a
              href="https://docs.google.com/document/d/1Q3S9qwr1akRhVcNKRcnCA7wWCQiMayVLTcoVwzCGBo4/edit"
              target="_blank"
            >
              Apply to host a group sitting
            </a>
          </p>
        </Popup>
      </GeoJSON>
    );
  }
}
