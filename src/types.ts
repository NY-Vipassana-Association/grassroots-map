import Leaflet from "leaflet";
import geojson from "geojson";

export interface IRegionalContact {
  name: string;
  emailAddress: string;
  phoneNumber: string;
}

export interface IOldStudentDataItem {
  region_name: string;
  student_count_all_time: number;
  regionalContact?: IRegionalContact;
}

export interface IGroupSitting {
  position: {
    lat: number;
    lng: number;
  };
  name: string;
  address: string;
  time: string;
  phoneNumber: string;
  email?: string;
}

export interface RegionProperties {
  name: string;
}

export interface IRegionGeoJSON extends Leaflet.GeoJSON<RegionProperties> {
  feature: geojson.Feature<geojson.MultiPoint, RegionProperties>;
  _path: SVGPathElement;
}

export type IRegionFeature = geojson.Feature<
  geojson.GeometryObject,
  RegionProperties
>;

export type IRegionFeatureCollection = geojson.FeatureCollection<
  geojson.GeometryObject,
  RegionProperties
>;
