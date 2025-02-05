import { CameraCapturedPicture } from "expo-camera";

export interface PlantItem {
  id: string;
  photo: CameraCapturedPicture | null;
  name: string;
  dateAdded: string;
  notes: string;
}

export type RootTabParamList = {
  AppStack: undefined;
  ListView: undefined;
  ScanView: { isEditMode?: boolean; plant?: PlantItem | null };
  Settings: undefined;
  Profile: undefined;
  PlantDetailsForm: { photo: CameraCapturedPicture };
  PlantDetails: { plant: PlantItem };
};
