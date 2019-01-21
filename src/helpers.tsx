import oldStudentDataJson from "./data/oldStudentData.json";
import { IOldStudentDataItem } from "./types";

const oldStudentData: IOldStudentDataItem[] = oldStudentDataJson;

export enum populationCounts {
  level1 = 0,
  level2 = 200,
  level3 = 500,
  level4 = 1000,
  level5 = 1500,
  level6 = 2000,
  level7 = 2500
}

export const populationColors = {
  [populationCounts.level1]: "#FED976",
  [populationCounts.level2]: "#FEB24C",
  [populationCounts.level3]: "#FD8D3C",
  [populationCounts.level4]: "#FC4E2A",
  [populationCounts.level5]: "#E31A1C",
  [populationCounts.level6]: "#BD0026",
  [populationCounts.level7]: "#800026"
};

export function getColor(count: IOldStudentDataItem["oldStudentCount"]) {
  const biggestKeySmallerThanCount: populationCounts = Object.keys(
    populationColors
  )
    .map(key => parseInt(key))
    .reduce((prev, curr) => (curr > prev && curr <= count ? curr : prev), 0);

  return populationColors[biggestKeySmallerThanCount];
}

export const getRegionDataByName = (name: IOldStudentDataItem["name"]) => {
  const regionDataItem = oldStudentData.find(region => region.name === name);
  if (!regionDataItem)
    console.warn("Could not find old student data for region", {
      name
    });

  return regionDataItem;
};
