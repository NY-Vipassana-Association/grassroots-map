import Leaflet from "leaflet";
import geojson from "geojson";

export interface IRegionalContact {
  name: string;
  emailAddress: string;
  phoneNumber: string;
}

export interface IOldStudentDataItem {
  name: string;
  oldStudentCount: number;
  regionalContact?: IRegionalContact;
}

export interface IGroupSitting {
  lat: number;
  lon: number;
  name: string;
  address: string;
  time: string;
  phoneNumber: string;
  email?: string;
}

export interface Borough {
  borough: string;
  boroughCode: number;
}

export interface IRegionGeoJSON extends Leaflet.GeoJSON<Borough> {
  feature: geojson.Feature<geojson.MultiPoint, Borough>;
  _path: SVGPathElement;
}

export type IRegionFeature = geojson.Feature<geojson.GeometryObject, Borough>;
export type IRegionFeatureCollection = geojson.FeatureCollection<
  geojson.GeometryObject,
  Borough
>;
