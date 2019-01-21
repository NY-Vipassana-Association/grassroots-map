// @ts-ignore
const fs = require("fs");

// NYC borough region data is from the below URL:
// http://data.beta.nyc//dataset/68c0332f-c3bb-4a78-a0c1-32af515892d6/resource/7c164faa-4458-4ff2-9ef0-09db00b509ef/download/42c737fd496f4d6683bba25fb0e86e1dnycboroughboundaries.geojson
const nycBoroughsJSON = require("./nycBoroughs.json");

// Northern NJ region data is from the below URL. Used QGIS application to:
// - remove southern counties
// - combine northern counties
// https://og-production-open-data-newarknj-892364687672.s3.amazonaws.com/resources/95db8cad-3a8c-41a4-b8b1-4991990f07f3/njcountypolygonv2.geojson?Signature=90k42s%2Ftzgo5qhYQ1U%2BaLhacxAU%3D&Expires=1548103718&AWSAccessKeyId=AKIAJJIENTAPKHZMIPXQ
const newJerseyCounties = require("./newJerseyCounties.json");

const njNorthernCountiesGeojsonData = newJerseyCounties;

const nycBoroughs = nycBoroughsJSON;

const nycRegions = nycBoroughs.features.map(boroughFeature => {
  return {
    ...boroughFeature,
    properties: {
      name: boroughFeature.properties.borough
    }
  };
});

const newJerseyCountiesToInclude = ["Essex"];

const newJerseyRegions = njNorthernCountiesGeojsonData.features
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
  type: nycBoroughs.type,
  features: [...nycRegions, ...newJerseyRegions]
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
