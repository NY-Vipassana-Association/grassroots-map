import React from "react";
import { Popup } from "react-leaflet";

import oldStudentDataJson from "../../oldStudentData.json";
import { IOldStudentDataItem } from "../../types";

const oldStudentData: IOldStudentDataItem[] = oldStudentDataJson;

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

interface IProps {
  boroughName: IOldStudentDataItem["name"];
}

export default class RegionLayerPopup extends React.Component<IProps> {
  render() {
    const { boroughName } = this.props;
    const boroughData = getBoroughDataByName(boroughName);

    return (
      <Popup>
        {boroughData ? (
          <p>
            There are{" "}
            <span>
              {boroughData
                ? boroughData.oldStudentCount
                : populationCounts.level1}
            </span>{" "}
            old students in {boroughName}.
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
    );
  }
}
