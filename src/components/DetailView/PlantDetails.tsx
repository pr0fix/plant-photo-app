import { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { PlantItem, RootTabParamList } from "../../utils/types";
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { Alert, Image, Pressable, StyleSheet, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { usePlantStore } from "../../context/store";
import { CameraCapturedPicture } from "expo-camera";
import Feather from "react-native-vector-icons/Feather";

type PlantDetailsRouteProp = RouteProp<RootTabParamList, "PlantDetails">;

/**
 * A detailed view of a singular plant's details component.
 *
 * @returns {React.JSX.Element} - The rendered PlantDetails component.
 */
const PlantDetails = (): JSX.Element => {
  const route = useRoute<PlantDetailsRouteProp>();
  const navigation = useNavigation<NavigationProp<RootTabParamList>>();
  const { plant } = route.params as { plant: PlantItem };
  const {
    photo,
    plantName,
    notes,
    setPlantName,
    setNotes,
    setPhoto,
    editPlant,
  } = usePlantStore();

  useEffect(() => {
    setPlantName(plant.name);
    setNotes(plant.notes);
    setPhoto(plant.photo as CameraCapturedPicture);
  }, [plant, setPlantName, setNotes, setPhoto]);

  const handleChangePhoto = () => {
    navigation.navigate("ScanView", { isEditMode: true, plant });
  };

  const handleEditSubmit = () => {
    if (!plantName.trim()) {
      Alert.alert("Error adding plant", "Plant Name is required.");
      return;
    }

    const updatedPlant = {
      ...plant,
      photo: photo,
      name: plantName,
      notes: notes,
    };

    editPlant(updatedPlant);

    navigation.reset({
      index: 0,
      routes: [{ name: "ListView" }],
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formContainer}>
        <Pressable style={styles.photoContainer} onPress={handleChangePhoto}>
          <Image source={{ uri: plant.photo?.uri }} style={styles.photo} />
          <View style={styles.overlay}>
            <Feather name="edit" size={24} color="#FFFFFF" />
            <Text style={styles.overlayText}>Tap to Change Photo</Text>
          </View>
        </Pressable>
        <TextInput
          style={styles.inputField}
          mode="outlined"
          outlineColor="#2D6A4F"
          outlineStyle={{ borderRadius: 5 }}
          activeOutlineColor="#2D6A4F"
          placeholder="Plant Name"
          label="Plant Name"
          value={plantName}
          onChangeText={setPlantName}
        />
        <TextInput
          style={[styles.inputField, styles.notesInput]}
          mode="outlined"
          outlineColor="#2D6A4F"
          outlineStyle={{ borderRadius: 5 }}
          activeOutlineColor="#2D6A4F"
          multiline
          numberOfLines={4}
          placeholder="Notes"
          label="Notes"
          value={notes}
          onChangeText={setNotes}
          submitBehavior="blurAndSubmit"
        />
        <Button onPress={handleEditSubmit} style={styles.submitButton}>
          <Text style={styles.confirmButtonText}>Confirm</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAF9F6",
    alignItems: "center",
    justifyContent: "center",
  },
  formContainer: {
    borderRadius: 15,
    width: "95%",
    alignItems: "center",
    marginBottom: 20,
  },
  photoContainer: {
    width: "100%",
    height: 300,
    marginBottom: 20,
  },
  photo: {
    width: "100%",
    height: 300,
    borderRadius: 15,
  },
  inputField: {
    width: "100%",
    height: 50,
    marginBottom: 20,
  },
  notesInput: {
    height: 100,
  },
  submitButton: {
    backgroundColor: "#2D6A4F",
    marginTop: 20,
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 20,
  },
  confirmButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  overlay: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 5,
    padding: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  overlayText: {
    color: "#FFFFFF",
    marginLeft: 5,
  },
});
export default PlantDetails;
