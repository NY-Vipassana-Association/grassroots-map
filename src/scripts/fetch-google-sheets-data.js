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
      student_count_all_time: matchingCountyWithStudentCount.osCount
    };
  });
};

gsjson({
  spreadsheetId: "15bAkyPI-hJj8N0sQGU3f47CCvClewkx6YQAJ-ASC_M4",
  allWorksheets: true
})
  .then(function(result) {
    const studentCountsResponse = result[0];
    const mapCounties = result[1];
    const allCountyStudentCountsResponse = result[2];

    fs.writeFileSync(
      "./src/data/gitignored/oldStudentData.json",
      JSON.stringify(
        includeOldStudentCounts(
          studentCountsResponse,
          allCountyStudentCountsResponse
        )
      )
    );

    fs.writeFileSync(
      "./src/data/gitignored/groupSittings.json",
      JSON.stringify(mapCounties)
    );
  })
  .catch(function(err) {
    console.log(err.message);
    console.log(err.stack);
  });
