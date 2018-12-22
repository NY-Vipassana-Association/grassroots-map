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

export type IRegionFeature = Feature<
  GeometryObject,
  {
    borough: string;
    boroughCode: number;
  }
>;

export interface IRegionFeaturesGeojson {
  type: GeoJsonTypes;
  features: IRegionFeature[];
}
