import React from "react";

import { IRegionGeoJSON } from "../types/index";
import { getBoroughDataByName } from "../helpers";

// @ts-ignore todo
import {
  container,
  heading,
  regionNameP,
  regionCountP
} from "./HoveredRegionInfoBox.css";

interface IProps {
  hoveredRegion: null | IRegionGeoJSON;
}

export default class HoveredRegionInfoBox extends React.Component<IProps> {
  render() {
    const { hoveredRegion } = this.props;

    return (
      <div className={container}>
        <h1 className={heading}>Vipassana Grassroots Map</h1>
        {(() => {
          if (!hoveredRegion) return "Hover over a region";

          const regionName = hoveredRegion.feature.properties.borough;
          const boroughData = getBoroughDataByName(
            hoveredRegion.feature.properties.borough
          );
          if (!boroughData) return;

          return (
            <>
              <p className={regionNameP}>{regionName}</p>
              <p className={regionCountP}>
                {boroughData.oldStudentCount} old students
              </p>
            </>
          );
        })()}
      </div>
    );
  }
}
