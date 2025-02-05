import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

/**
 * A placeholder component for the settings page.
 *
 * @returns {JSX.Element} - The rendered settings view component.
 */
const Settings = (): JSX.Element => {
  return (
    <View style={styles.settingsTextContainer}>
      <Text style={styles.placeholderText}>This is the settings page</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  settingsTextContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FAF9F6",
  },
  placeholderText: {
    fontSize: 18,
    color: "#2D6A4F",
    textAlign: "center",
    marginBottom: 20,
  },
});

export default Settings;
