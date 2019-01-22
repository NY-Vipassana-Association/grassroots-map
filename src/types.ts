import Leaflet from "leaflet";
import geojson from "geojson";

export interface IOldStudentDataItem {
  region_name: string;
  student_count_all_time: number;
  regional_contact?: string;
}

export interface IGroupSitting {
  position_lat: number;
  position_lng: number;
  name: string;
  address: string;
  time: string;
  phone_number: string;
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
