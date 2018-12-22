import { GeoJsonTypes, Feature, GeometryObject } from "geojson";

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
  lat: string;
  lon: string;
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

export type IRegionFeature = Feature<GeometryObject, Borough>;

export interface IRegionFeaturesGeojson {
  type: GeoJsonTypes;
  features: IRegionFeature[];
}
