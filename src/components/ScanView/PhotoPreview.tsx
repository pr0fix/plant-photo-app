import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationProp, RouteProp, useRoute } from "@react-navigation/native";
import { Text } from "react-native-paper";
import { CameraCapturedPicture } from "expo-camera";
import { RootTabParamList } from "../../utils/types";
import { usePlantStore } from "../../context/store";

interface PhotoPreviewProps {
  photo: CameraCapturedPicture;
  handleRetakePhoto: () => void;
  navigation: NavigationProp<RootTabParamList>;
}

type PhotoPreviewRouteProp = RouteProp<RootTabParamList, "ScanView">;

/**
 * Photo preview component that handles showing the taken photo and allowing to continue or retake it.
 *
 * @param {Object} props - The component accepts photo, handleRetakePhoto and navigation as props.
 * @param {CameraCapturedPicture} props.photo - The captured photo data.
 * @param {() => void} props.handleRetakePhoto - Callback function to retake the photo.
 * @param {NavigationProp} props.navigation - The prop contaning navigation.
 *
 * @returns {JSX.Element} - The rendered PhotoPreview component.
 */
const PhotoPreview = ({
  photo,
  handleRetakePhoto,
  navigation,
}: PhotoPreviewProps): JSX.Element => {
  const { clearPhoto } = usePlantStore();
  const route = useRoute<PhotoPreviewRouteProp>();
  const isEditMode = route.params?.isEditMode;
  const originalPlant = route.params?.plant;

  const handlePhotoConfirm = () => {
    if (isEditMode && originalPlant) {
      navigation.navigate("PlantDetails", {
        plant: { ...originalPlant, photo: photo },
      });
    } else {
      navigation.navigate("PlantDetailsForm", { photo });
    }
    clearPhoto();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.overlayText}>Preview your photo</Text>
        <Image style={styles.previewContainer} source={{ uri: photo.uri }} />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.retakeButton]}
          onPress={handleRetakePhoto}
        >
          <Text style={styles.buttonText}>Retake</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.confirmButton]}
          onPress={handlePhotoConfirm}
        >
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
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
    padding: 20,
  },
  box: {
    borderRadius: 15,
    width: "95%",
    alignItems: "center",
    marginBottom: 20,
  },
  overlayText: {
    color: "#2D6A4F",
    fontSize: 18,
    marginBottom: 5,
  },
  previewContainer: {
    width: "100%",
    height: 450,
    borderRadius: 15,
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    paddingHorizontal: 5,
  },
  button: {
    flex: 1,
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: "center",
    marginHorizontal: 5,
  },
  retakeButton: {
    backgroundColor: "#808080",
  },
  confirmButton: {
    backgroundColor: "#2D6A4F",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default PhotoPreview;
