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

export interface IRegionFeature {
  id: number;
  properties: {
    borough: string;
    boroughCode: number;
  };
}

export interface IRegionFeaturesGeojson {
  features: IRegionFeature[];
}
