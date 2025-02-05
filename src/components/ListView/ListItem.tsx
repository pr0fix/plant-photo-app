import React from "react";
import { Card, Text } from "react-native-paper";
import { Pressable, StyleSheet, View } from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { PlantItem, RootTabParamList } from "../../utils/types";
import Feather from "react-native-vector-icons/Feather";

interface ListItemProps {
  item: PlantItem;
}

/**
 * A single plant card component to be rendered in ListView.
 *
 * @param {Object} props - The component accepts item as props.
 * @param {PlantItem} props.item - The single plant item's data.
 *
 * @returns {JSX.Element} - The rendered ListItem card component.
 */
const ListItem = ({ item }: ListItemProps): JSX.Element => {
  const navigation = useNavigation<NavigationProp<RootTabParamList>>();
  const handleCardPress = () => {
    navigation.navigate("PlantDetails", { plant: item });
  };

  return (
    <View style={styles.cardContainer}>
      <Pressable onPress={handleCardPress}>
        <Card style={styles.card}>
          <Card.Cover
            source={{ uri: item.photo?.uri }}
            style={styles.photo}
            resizeMode="cover"
          />
          <Card.Content style={styles.textContainer}>
            <Text style={styles.nameText}>{item.name}</Text>
            <Text style={styles.dateText}>Added on {item.dateAdded}</Text>
          </Card.Content>
          <View style={styles.overlay}>
            <Feather name="edit" size={24} color="#FFFFFF" />
            <Text style={styles.overlayText}>Tap to Edit</Text>
          </View>
        </Card>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    padding: 10,
  },
  card: {
    borderRadius: 15,
    overflow: "hidden",
    backgroundColor: "#FAF9F6",
  },
  photo: {
    width: "100%",
    height: 300,
    borderRadius: 0,
  },
  textContainer: {
    padding: 10,
  },
  nameText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#2D6A4F",
  },
  dateText: {
    fontSize: 16,
    color: "#6B6B6B",
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

export default ListItem;
