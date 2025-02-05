import { MD3LightTheme, PaperProvider } from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import AppNavigator from "./src/navigation/AppNavigator";

const App = () => {
  return (
    <PaperProvider theme={MD3LightTheme}>
      <StatusBar />
      <AppNavigator />
    </PaperProvider>
  );
};

export default App;
