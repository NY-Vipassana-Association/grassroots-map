import oldStudentDataJson from "./data/gitignored/oldStudentData.json";
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
  [populationCounts.level1]: "#C7CED6",
  [populationCounts.level2]: "#ABBEC5",
  [populationCounts.level3]: "#8098BC",
  [populationCounts.level4]: "#4D5D76",
  [populationCounts.level5]: "#403D48",
  [populationCounts.level6]: "#DFC2AB",
  [populationCounts.level7]: "#D3764E"
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
