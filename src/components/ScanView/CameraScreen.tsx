import { useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootTabParamList } from "../../utils/types";
import Entypo from "react-native-vector-icons/Entypo";
import PhotoPreview from "./PhotoPreview";
import { usePlantStore } from "../../context/store";

/**
 * Camera screen component that handles camera functionality.
 * Manages camera permissions, photo preview and photo capture using Expo Camera.
 *
 * @returns {JSX.Element} - The permission granting or camera component or photopreview component
 */
const CameraScreen = (): JSX.Element => {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const { photo, setPhoto, clearPhoto } = usePlantStore();
  const cameraRef = useRef<CameraView | null>(null);
  const navigation = useNavigation<NavigationProp<RootTabParamList>>();

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.message}>
          We need your permission to use the camera.
        </Text>
        <TouchableOpacity
          style={styles.permissionButton}
          onPress={requestPermission}
        >
          <Text style={styles.permissionButtonText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const toggleCameraFacing = () => {
    setFacing((current) => (current === "back" ? "front" : "back"));
  };

  const handleTakePhoto = async () => {
    if (cameraRef.current) {
      const options = {
        quality: 1,
        base64: true,
        exif: false,
      };
      const takenPhoto = await cameraRef.current.takePictureAsync(options);

      if (takenPhoto) {
        setPhoto(takenPhoto);
      }
    }
  };

  const handleRetakePhoto = () => clearPhoto();

  if (photo)
    return (
      <PhotoPreview
        photo={photo}
        handleRetakePhoto={handleRetakePhoto}
        navigation={navigation}
      />
    );

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <Entypo name="retweet" size={44} color="#FFFFFF" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleTakePhoto}>
            <Entypo name="camera" size={44} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
};

const styles = StyleSheet.create({
  permissionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#FAF9F6",
  },
  message: {
    fontSize: 18,
    color: "#2D6A4F",
    textAlign: "center",
    marginBottom: 20,
  },
  permissionButton: {
    backgroundColor: "#2D6A4F",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  permissionButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    justifyContent: "center",
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 56,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
    marginHorizontal: 20,
    backgroundColor: "#2D6A4F",
    borderRadius: 10,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
});

export default CameraScreen;
