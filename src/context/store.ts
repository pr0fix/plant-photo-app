import { create } from "zustand";
import { PlantItem } from "../utils/types";
import { CameraCapturedPicture } from "expo-camera";

type PlantStore = {
  plants: PlantItem[];
  photo: CameraCapturedPicture | null;
  plantName: string;
  notes: string;
  setPhoto: (photo: CameraCapturedPicture) => void;
  clearPhoto: () => void;
  setPlantName: (name: string) => void;
  setNotes: (notes: string) => void;
  addPlant: (plant: PlantItem) => void;
  editPlant: (updatedPlant: PlantItem) => void;
};

export const usePlantStore = create<PlantStore>((set) => ({
  plants: [],
  photo: null,
  plantName: "",
  notes: "",
  setPhoto: (photo: CameraCapturedPicture) => set({ photo }),
  clearPhoto: () => set({ photo: null }),
  setPlantName: (name: string) => set({ plantName: name }),
  setNotes: (notes: string) => set({ notes: notes }),
  addPlant: (plant: PlantItem) => {
    set((state) => ({ plants: [...state.plants, plant] }));
  },
  editPlant: (updatedPlant: PlantItem) => {
    set((state) => ({
      plants: state.plants.map((plant) =>
        plant.id === updatedPlant.id ? updatedPlant : plant
      ),
    }));
  },
}));
