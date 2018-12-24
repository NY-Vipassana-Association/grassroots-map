import React from "react";
import { GeoJSON } from "react-leaflet";

import nycBoroughsJSON from "../../nycBoroughs.json";
import { IRegionFeatureCollection, IOldStudentDataItem } from "../../types";
import RegionLayerPopup from "./RegionLayerPopup";

const nycBoroughsData = nycBoroughsJSON as IRegionFeatureCollection;

const mapRegionLayerToName = (layer: IRegionGeoJSON) =>
  layer.feature.properties.borough;

interface IState {
  selectedBoroughName: null | IOldStudentDataItem["name"];
}

export default class RegionGeoJSONLayer extends React.Component<{}, IState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      selectedBoroughName: null
    };
  }

  onClick = event => {
    this.setState({ selectedBoroughName: mapRegionLayerToName(event.target) });
  };

  onEachFeature = (_feature, layer) => {
    layer.on({
      click: this.onClick
    });
  };

  render() {
    const { selectedBoroughName } = this.state;

    return (
      <GeoJSON data={nycBoroughsData} onEachFeature={this.onEachFeature}>
        {selectedBoroughName ? (
          <RegionLayerPopup boroughName={selectedBoroughName} />
        ) : null}
      </GeoJSON>
    );
  }
}
