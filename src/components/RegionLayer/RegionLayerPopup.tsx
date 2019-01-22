import React from "react";
import { Popup } from "react-leaflet";

import { IOldStudentDataItem } from "../../types";
import RegionalContactInfo from "./RegionalContactInfo";
import { getRegionDataByName, populationCounts } from "../../helpers";

// todo: rename from borough to region
interface IProps {
  boroughName: IOldStudentDataItem["region_name"];
}

export default class RegionLayerPopup extends React.Component<IProps> {
  render() {
    const { boroughName } = this.props;
    const boroughData = getRegionDataByName(boroughName);

    if (!boroughData) return null;

    const { regional_contact } = boroughData;

    return (
      <Popup>
        <p>
          There are{" "}
          <span>
            {boroughData
              ? boroughData.student_count_all_time
              : populationCounts.level1}
          </span>{" "}
          old students in {boroughName}.
        </p>
        {regional_contact ? (
          <RegionalContactInfo
            regionName={boroughName}
            regionalContact={regional_contact}
          />
        ) : (
          <p>
            If you are interested in joining your local community planning team,
            please reach out to our Dhamma Service Committee at
            dhammaservice.nyva@gmail.com or (413) 438-7821.
          </p>
        )}
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
