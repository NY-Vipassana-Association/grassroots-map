import React from "react";

import { IRegionGeoJSON } from "../types";
import { getBoroughDataByName } from "../helpers";

import {
  // @ts-ignore todo
  box,
  // @ts-ignore todo
  info,
  // @ts-ignore todo
  heading,
  // @ts-ignore todo
  regionNameP,
  // @ts-ignore todo
  regionCountP
} from "./Box.module.css";

interface IProps {
  hoveredRegion: null | IRegionGeoJSON;
}

export default class HoveredRegionInfoBox extends React.Component<IProps> {
  render() {
    const { hoveredRegion } = this.props;

    return (
      <div className={`${box} ${info}`} data-test="hover-info-box">
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
