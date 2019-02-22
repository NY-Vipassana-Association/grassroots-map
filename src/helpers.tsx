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
  [populationCounts.level2]: "#6ED7F4",
  [populationCounts.level3]: "#58BBEA",
  [populationCounts.level4]: "#429FE0",
  [populationCounts.level5]: "#2C82D6",
  [populationCounts.level6]: "#1666CC",
  [populationCounts.level7]: "#004AC2"
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
