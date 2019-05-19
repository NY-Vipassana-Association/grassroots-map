// @ts-ignore
const gsjson = require("google-spreadsheet-to-json");
const fs = require("fs");

// Inserts the old student counts from the all_county_student_counts worksheet
// into the map_counties worksheet
const includeOldStudentCounts = (
  mapCounties,
  allCountyStudentCountsResponse
) => {
  return mapCounties.map(mapCounty => {
    const matchingCountyWithStudentCount = allCountyStudentCountsResponse.find(
      countyWithStudentCount =>
        countyWithStudentCount.state === mapCounty.state_name &&
        (countyWithStudentCount.county === mapCounty.region_name ||
          // if the name we use for the map county doesn't match the student count
          // county's name, then check for an official name (i.e. Brooklyn's
          // official name is Kings)
          countyWithStudentCount.county === mapCounty.official_name)
    );

    if (!matchingCountyWithStudentCount) {
      console.error(
        `Could not find matching county for ${mapCounty.region_name}, ${
          mapCounty.state_name
        }`
      );

      return 0;
    }

    return {
      ...mapCounty,
      student_count_all_time: matchingCountyWithStudentCount.oscount
    };
  });
};

const getMapCounties = allWorksheets => {
  const studentCountsResponse = allWorksheets[0];
  const allCountyStudentCountsResponse = allWorksheets[2];

  return includeOldStudentCounts(
    studentCountsResponse,
    allCountyStudentCountsResponse
  );
};

const getGroupSittings = allWorksheets => {
  return allWorksheets[1];
};

const getMetadata = allWorksheets => {
  const metadataWorksheet = allWorksheets[3];
  return metadataWorksheet[0];
};

gsjson({
  spreadsheetId: "15bAkyPI-hJj8N0sQGU3f47CCvClewkx6YQAJ-ASC_M4",
  allWorksheets: true
})
  .then(function(allWorksheets) {
    fs.writeFileSync(
      "./src/data/gitignored/oldStudentData.json",
      JSON.stringify(getMapCounties(allWorksheets))
    );

    fs.writeFileSync(
      "./src/data/gitignored/groupSittings.json",
      JSON.stringify(getGroupSittings(allWorksheets))
    );

    fs.writeFileSync(
      "./src/data/gitignored/metadata.json",
      JSON.stringify(getMetadata(allWorksheets))
    );
  })
  .catch(function(err) {
    console.log(err.message);
    console.log(err.stack);
  });
