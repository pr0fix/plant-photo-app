import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

/**
 * A placeholder component for user profile page.
 *
 * @returns {JSX.Element} - The rendered profile view component.
 */
const Profile = (): JSX.Element => {
  return (
    <View style={styles.profilePageContainer}>
      <Text style={styles.placeholderText}>This is the profile page</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  profilePageContainer: {
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

export default Profile;
