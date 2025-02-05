import React from "react";
import { Alert, Image, StyleSheet, View } from "react-native";
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { Button, Text, TextInput } from "react-native-paper";
import uuid from "react-native-uuid";
import { SafeAreaView } from "react-native-safe-area-context";
import { CameraCapturedPicture } from "expo-camera";
import { usePlantStore } from "../../context/store";
import { RootTabParamList } from "../../utils/types";

type PlantDetailsFormRouteProp = RouteProp<
  RootTabParamList,
  "PlantDetailsForm"
>;

/**
 * Add plant form that allows user to add details such as name and additional notes before adding the plant to list.
 *
 * @returns {JSX.Element} - The rendered PlantDetailsForm component.
 */
const PlantDetailsForm = (): JSX.Element => {
  const { plantName, notes, setPlantName, setNotes, addPlant } =
    usePlantStore();
  const navigation = useNavigation<NavigationProp<RootTabParamList>>();
  const route = useRoute<PlantDetailsFormRouteProp>();
  const { photo } = route.params as { photo: CameraCapturedPicture };

  const handleSubmit = () => {
    if (!plantName.trim()) {
      Alert.alert("Error adding plant", "Plant Name is required.");
      return;
    }

    const newPlant = {
      id: uuid.v4() as string,
      photo: photo,
      name: plantName,
      dateAdded: new Date().toLocaleDateString(),
      notes,
    };
    addPlant(newPlant);
    navigation.reset({
      index: 0,
      routes: [{ name: "ListView" }],
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formContainer}>
        <Image source={{ uri: photo.uri }} style={styles.photo} />
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
        <Button onPress={handleSubmit} style={styles.submitButton}>
          <Text style={styles.submitButtonText}>Submit</Text>
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
  photo: {
    width: "100%",
    height: 300,
    borderRadius: 15,
    marginBottom: 20,
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
  submitButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});

export default PlantDetailsForm;
