import React, { useLayoutEffect } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootTabParamList } from "../../utils/types";
import { usePlantStore } from "../../context/store";
import ListItem from "./ListItem";

/**
 * A list component for rendering ListItem plant cards.
 *
 * @returns {JSX.Element} - The rendered FlatList component.
 */
const ListView = (): JSX.Element => {
  const { plants, setPlantName, setNotes, clearPhoto } = usePlantStore();
  const navigation = useNavigation<NavigationProp<RootTabParamList>>();

  const handleButtonPress = () => {
    setPlantName("");
    setNotes("");
    clearPhoto();
    navigation.navigate("ScanView", { isEditMode: false, plant: null });
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          style={styles.addButton}
          labelStyle={styles.buttonLabel}
          onPress={handleButtonPress}
        >
          Add New Plant
        </Button>
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      {plants.length > 0 ? (
        <FlatList
          data={plants}
          renderItem={({ item }) => <ListItem item={item} />}
        />
      ) : (
        <View style={styles.noDataContainer}>
          <Text style={styles.noDataText}>
            Your garden is empty.{"\n"}Tap the button to add a new plant!
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAF9F6",
  },
  noDataContainer: {
    flex: 1,
    justifyContent: "center",
    margin: "auto",
  },
  noDataText: {
    fontSize: 16,
    color: "#2D6A4F",
    fontWeight: "bold",
    textAlign: "center",
  },
  addButton: {
    backgroundColor: "#2D6A4F",
    marginRight: 5,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonLabel: {
    color: "#FFFFFF",
  },
});

export default ListView;
