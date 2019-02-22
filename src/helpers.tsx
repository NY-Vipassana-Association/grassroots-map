import oldStudentDataJson from "./data/oldStudentData.json";
import { IOldStudentDataItem } from "./types";

const oldStudentData: IOldStudentDataItem[] = oldStudentDataJson;

export enum populationCounts {
  level1 = 0,
  level2 = 50,
  level3 = 100,
  level4 = 200,
  level5 = 400,
  level6 = 1500,
  level7 = 2500
}

// generated with http://www.perbang.dk/rgbgradient/
export const populationColors = {
  [populationCounts.level1]: "#85F4FF",
  [populationCounts.level2]: "#6ED2EA",
  [populationCounts.level3]: "#58B0D6",
  [populationCounts.level4]: "#428EC2",
  [populationCounts.level5]: "#2C6CAD",
  [populationCounts.level6]: "#164A99",
  [populationCounts.level7]: "#002985"
};

export function getColor(count: IOldStudentDataItem["student_count_all_time"]) {
  const biggestKeySmallerThanCount: populationCounts = Object.keys(
    populationColors
  )
    .map(key => parseInt(key))
    .reduce((prev, curr) => (curr > prev && curr <= count ? curr : prev), 0);

  return populationColors[biggestKeySmallerThanCount];
}

export const getRegionDataByName = (
  name: IOldStudentDataItem["region_name"]
) => {
  const regionDataItem = oldStudentData.find(
    region => region.region_name === name
  );
  if (!regionDataItem)
    console.warn("Could not find old student data for region", {
      name
    });

  return regionDataItem;
};
