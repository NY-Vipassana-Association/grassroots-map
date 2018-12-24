import React from "react";
import { GeoJSON, Popup } from "react-leaflet";

import oldStudentDataJson from "../../oldStudentData.json";
import nycBoroughsJSON from "../../nycBoroughs.json";
import { IRegionFeatureCollection, IOldStudentDataItem } from "../../types";

const oldStudentData: IOldStudentDataItem[] = oldStudentDataJson;
const nycBoroughsData = nycBoroughsJSON as IRegionFeatureCollection;

const mapRegionLayerToName = (layer: IRegionGeoJSON) =>
  layer.feature.properties.borough;

const getBoroughDataByName = (name: IOldStudentDataItem["name"]) => {
  const boroughDataItem = oldStudentData.find(borough => borough.name === name);
  if (!boroughDataItem)
    console.error("Could not find old student data for borough");

  return boroughDataItem;
};

enum populationCounts {
  level1 = 0,
  level2 = 200,
  level3 = 500,
  level4 = 1000,
  level5 = 1500,
  level6 = 2000,
  level7 = 2500
}

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
    const boroughData = getBoroughDataByName(selectedBoroughName);

    return (
      <GeoJSON data={nycBoroughsData} onEachFeature={this.onEachFeature}>
        <Popup>
          {boroughData ? (
            <p>
              There are{" "}
              <span>
                {boroughData
                  ? boroughData.oldStudentCount
                  : populationCounts.level1}
              </span>{" "}
              old students in {selectedBoroughName}.
            </p>
          ) : null}
          {/* {renderRegionalContactInfo(
            boroughData && boroughData.regionalContact
          )} */}
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
