import React from "react";
import { GeoJSON } from "react-leaflet";
import Leaflet, { LeafletEvent } from "leaflet";

import nycBoroughsData from "../../data/regions";

import {
  IOldStudentDataItem,
  IBoroughGeoJSON,
  IBoroughFeature
} from "../../types";

import RegionLayerPopup from "./RegionLayerPopup";

import {
  getColor,
  getBoroughDataByName,
  populationCounts
} from "../../helpers";

const mapRegionNameToDataTestName = (
  name: IBoroughFeature["properties"]["borough"]
) =>
  `region-${name
    .toLowerCase()
    .split(" ")
    .join("-")}`;

const mapRegionLayerToName = (layer: IBoroughGeoJSON) =>
  layer.feature.properties.borough;

const getFeatureColor = (feature: IBoroughFeature) => {
  const boroughData = getBoroughDataByName(feature.properties.borough);

  return getColor(
    boroughData ? boroughData.oldStudentCount : populationCounts.level1
  );
};

interface IProps {
  setHoveredRegion: (regionName: null | IBoroughGeoJSON) => void;
  hoveredRegion: null | IBoroughGeoJSON;
}

interface IState {
  selectedBoroughName: null | IOldStudentDataItem["name"];
}

export default class RegionGeoJSONLayer extends React.Component<
  IProps,
  IState
> {
  geojsonRef: React.RefObject<GeoJSON>;

  constructor(props: IProps) {
    super(props);
    this.state = {
      selectedBoroughName: null
    };

    this.geojsonRef = React.createRef();
  }

  onClick = (event: LeafletEvent) => {
    this.setState({ selectedBoroughName: mapRegionLayerToName(event.target) });
  };

  highlightFeature = (layer: IBoroughGeoJSON) => {
    layer.setStyle({
      weight: 5,
      color: "#666",
      dashArray: "",
      fillOpacity: 0.7
    });

    if (
      !Leaflet.Browser.ie &&
      // @ts-ignore "opera" is supported but missing from Browser types
      // https://leafletjs.com/reference-1.3.4.html#browser
      !Leaflet.Browser.opera &&
      !Leaflet.Browser.edge
    ) {
      layer.bringToFront();
    }
  };

  componentDidUpdate = (prevProps: IProps) => {
    const { hoveredRegion } = this.props;

    if (prevProps.hoveredRegion !== hoveredRegion) {
      if (hoveredRegion) this.highlightFeature(hoveredRegion);
      if (prevProps.hoveredRegion)
        this.getGeojsonLeafletElement().resetStyle(prevProps.hoveredRegion);
    }
  };

  handleMouseover = (e: Leaflet.LeafletEvent) => {
    this.highlightFeature(e.target);
    this.props.setHoveredRegion(e.target);
  };

  handleMouseout = () => {
    this.props.setHoveredRegion(null);
  };

  onEachFeature = (_feature: any, layer: any) => {
    layer.on({
      click: this.onClick,
      mouseover: this.handleMouseover,
      mouseout: this.handleMouseout
    });
  };

  getGeojsonLeafletElement = () => {
    const geojsonRefElement = this.geojsonRef.current;
    if (!geojsonRefElement) return;
    return geojsonRefElement.leafletElement as any;
  };

  setDataTestAttributeOnFeatures() {
    const layers = Object.values(
      this.getGeojsonLeafletElement()._layers
    ) as any;

    layers.forEach((layer: any) => {
      layer._path.setAttribute(
        "data-test",
        mapRegionNameToDataTestName(mapRegionLayerToName(layer))
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
        style={(feature?: IBoroughFeature) => ({
          // fillColor: populationCounts.level1.toString(),
          fillColor: feature
            ? getFeatureColor(feature)
            : populationCounts.level1.toString(),
          weight: 2,
          opacity: 1,
          color: "#ac8686",
          fillOpacity: 0.7
        })}
      >
        {selectedBoroughName ? (
          <RegionLayerPopup boroughName={selectedBoroughName} />
        ) : null}
      </GeoJSON>
    );
  }
}
