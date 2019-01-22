// @ts-ignore
const fs = require("fs");

// NYC borough region data is from the below URL:
// http://data.beta.nyc//dataset/68c0332f-c3bb-4a78-a0c1-32af515892d6/resource/7c164faa-4458-4ff2-9ef0-09db00b509ef/download/42c737fd496f4d6683bba25fb0e86e1dnycboroughboundaries.geojson
const nycBoroughGeojson = require("./nycBoroughs.json");

// Northern NJ region data is from the below URL. Used QGIS application to:
// - remove southern counties
// - combine northern counties
// https://og-production-open-data-newarknj-892364687672.s3.amazonaws.com/resources/95db8cad-3a8c-41a4-b8b1-4991990f07f3/njcountypolygonv2.geojson?Signature=90k42s%2Ftzgo5qhYQ1U%2BaLhacxAU%3D&Expires=1548103718&AWSAccessKeyId=AKIAJJIENTAPKHZMIPXQ
const newJerseyCountyGeojson = require("./newJerseyCounties.json");

// New York county region data (not including NYC counties) from:
// https://raw.githubusercontent.com/codeforamerica/click_that_hood/master/public/data/new-york-counties.geojson
const newYorkCountiesGeojson = require("./newYorkCounties.json");

const regionStudentData = require("../../data/oldStudentData.json");

const nycRegions = nycBoroughGeojson.features.map(boroughFeature => {
  return {
    ...boroughFeature,
    properties: {
      name: boroughFeature.properties.borough
    }
  };
});

const nycBoroughNames = [
  "Bronx",
  "Queens",
  "Manhattan",
  "Staten Island",
  "Brooklyn"
];

const newYorkCountiesToInclude = regionStudentData
  .filter(
    regionStudentItem =>
      regionStudentItem.state_name === "NY" &&
      !nycBoroughNames.includes(regionStudentItem.region_name)
  )
  .map(regionStudentItem => regionStudentItem.region_name);

const newYorkCountyFeatures = newYorkCountiesGeojson.features
  .filter(county =>
    newYorkCountiesToInclude.includes(county.properties.name.split(" ")[0])
  )
  .map(newYorkCountyFeature => ({
    ...newYorkCountyFeature,
    properties: {
      name: newYorkCountyFeature.properties.name.split(" ")[0]
    }
  }));

const newJerseyCountiesToInclude = regionStudentData
  .filter(regionStudentItem => regionStudentItem.state_name === "NJ")
  .map(regionStudentItem => regionStudentItem.region_name);

const newJerseyRegions = newJerseyCountyGeojson.features
  .filter(newJerseyCountyFeature =>
    newJerseyCountiesToInclude.includes(
      newJerseyCountyFeature.properties.county
    )
  )
  .map(newJerseyCountyFeature => {
    return {
      ...newJerseyCountyFeature,
      properties: {
        name: newJerseyCountyFeature.properties.county
      }
    };
  });

const allRegions = {
  type: nycBoroughGeojson.type,
  features: [...nycRegions, ...newJerseyRegions, ...newYorkCountyFeatures]
};

const createRegionsFile = () => {
  fs.writeFile(
    `${__dirname}/../../data/regions.json`,
    JSON.stringify(allRegions),
    function(err) {
      if (err) {
        return console.log(err);
      }

      console.log("The file was saved!");
    }
  );
};

createRegionsFile();
