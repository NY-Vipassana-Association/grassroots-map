import React from "react";

import {
  // @ts-ignore todo
  box,
  // @ts-ignore todo
  legend
} from "./Box.css";

import { getColor, populationColors } from "../helpers";

class MapLegend extends React.Component {
  render() {
    const colorKeys = Object.keys(populationColors).map(divider =>
      parseInt(divider)
    );

    // loop through our density intervals and generate a label with a colored square for each interval
    return (
      <div className={`${box} ${legend}`}>
        {colorKeys.map((colorKey, index) => {
          const nextColorKey = colorKeys[index + 1];
          return (
            <div>
              <i style={{ background: getColor(colorKey) }} />
              <span>{colorKey}</span>
              <span>{nextColorKey ? `–${nextColorKey}` : "+"}</span>
            </div>
          );
        })}
      </div>
    );
  }
}

export default MapLegend;
