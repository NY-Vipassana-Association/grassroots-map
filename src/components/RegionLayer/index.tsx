import React from "react";
import { GeoJSON } from "react-leaflet";

import nycBoroughsJSON from "../../nycBoroughs.json";
import { IRegionFeatureCollection, IOldStudentDataItem } from "../../types";
import RegionLayerPopup from "./RegionLayerPopup";

const nycBoroughsData = nycBoroughsJSON as IRegionFeatureCollection;

const mapRegionNameToClassName = (
  name: IRegionFeature["properties"]["borough"]
) =>
  `region-${name
    .toLowerCase()
    .split(" ")
    .join("-")}`;

const mapRegionLayerToName = (layer: IRegionGeoJSON) =>
  layer.feature.properties.borough;

interface IState {
  selectedBoroughName: null | IOldStudentDataItem["name"];
}

export default class RegionGeoJSONLayer extends React.Component<{}, IState> {
  geojsonRef: React.RefObject<GeoJSON>;

  constructor(props: {}) {
    super(props);
    this.state = {
      selectedBoroughName: null
    };

    this.geojsonRef = React.createRef();
  }

  onClick = event => {
    this.setState({ selectedBoroughName: mapRegionLayerToName(event.target) });
  };

  onEachFeature = (_feature, layer) => {
    layer.on({
      click: this.onClick
    });
  };

  setDataTestAttributeOnFeatures() {
    const geojsonRefElement = this.geojsonRef.current;
    if (!geojsonRefElement) return;

    const layers = Object.values(geojsonRefElement.leafletElement._layers);

    layers.forEach(layer => {
      layer._path.setAttribute(
        "data-test",
        mapRegionNameToClassName(mapRegionLayerToName(layer))
      );
    });
  }

  componentDidMount() {
    this.setDataTestAttributeOnFeatures();
  }

  render() {
    const { selectedBoroughName } = this.state;

    return (
      <GeoJSON
        ref={this.geojsonRef}
        data={nycBoroughsData}
        onEachFeature={this.onEachFeature}
      >
        {selectedBoroughName ? (
          <RegionLayerPopup boroughName={selectedBoroughName} />
        ) : null}
      </GeoJSON>
    );
  }
}
