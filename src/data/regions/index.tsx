import geojson from "geojson";

// NYC borough region data is from the below URL:
// http://data.beta.nyc//dataset/68c0332f-c3bb-4a78-a0c1-32af515892d6/resource/7c164faa-4458-4ff2-9ef0-09db00b509ef/download/42c737fd496f4d6683bba25fb0e86e1dnycboroughboundaries.geojson
import nycBoroughsJSON from "./nycBoroughs.json";

// Northern NJ region data is from the below URL. Used QGIS application to:
// - remove southern counties
// - combine northern counties
// https://og-production-open-data-newarknj-892364687672.s3.amazonaws.com/resources/95db8cad-3a8c-41a4-b8b1-4991990f07f3/njcountypolygonv2.geojson?Signature=90k42s%2Ftzgo5qhYQ1U%2BaLhacxAU%3D&Expires=1548103718&AWSAccessKeyId=AKIAJJIENTAPKHZMIPXQ
import nJNorthernCountiesGeojson from "./nJNorthernCountiesGeojson.json";

type IBoroughFeatureCollection = geojson.FeatureCollection<
  geojson.GeometryObject,
  {
    borough: string;
  }
>;

type INewJerseyFeatureCollection = geojson.FeatureCollection<
  geojson.GeometryObject,
  {
    county: string;
  }
>;

const njNorthernCountiesGeojsonData = nJNorthernCountiesGeojson as INewJerseyFeatureCollection;

const nycBoroughs = (nycBoroughsJSON as unknown) as IBoroughFeatureCollection;

const nycRegions = nycBoroughs.features.map(boroughFeature => {
  return {
    ...boroughFeature,
    properties: {
      name: boroughFeature.properties.borough
    }
  };
});

const northernNJRegionFeatures = njNorthernCountiesGeojsonData.features.map(
  boroughFeature => {
    return {
      ...boroughFeature,
      properties: {
        name: "Northern New Jersey"
      }
    };
  }
);

export default {
  type: nycBoroughs.type,
  features: [...nycRegions, ...northernNJRegionFeatures]
};
