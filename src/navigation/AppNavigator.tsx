import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import {
  NavigationContainer,
  ParamListBase,
  RouteProp,
} from "@react-navigation/native";
import ListView from "../components/ListView/ListView";
import ScanView from "../components/ScanView/ScanView";
import Settings from "../components/Placeholders/Settings";
import Profile from "../components/Placeholders/Profile";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";
import PlantDetailsForm from "../components/ScanView/PlantDetailsForm";
import PlantDetails from "../components/DetailView/PlantDetails";

type IconMapping = {
  [key: string]: {
    icon: string;
    IconComponent: typeof Entypo | typeof FontAwesome | typeof Ionicons;
  };
};

const NAVBAR_ICONS: IconMapping = {
  AppStack: {
    icon: "tree",
    IconComponent: Entypo,
  },
  Settings: {
    icon: "gear",
    IconComponent: FontAwesome,
  },
  Profile: {
    icon: "person",
    IconComponent: Ionicons,
  },
};

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="ListView"
      screenOptions={{
        headerStyle: {
          backgroundColor: "#FAF9F6",
        },
        headerTitleStyle: {
          fontWeight: "bold",
        },
        headerTintColor: "#2D6A4F",
      }}
    >
      <Stack.Screen
        name="ListView"
        component={ListView}
        options={{ title: "My Plants" }}
      />
      <Stack.Screen
        name="ScanView"
        component={ScanView}
        options={({ route }: { route: RouteProp<ParamListBase> }) => ({
          title:
            route.params &&
            "isEditMode" in route.params &&
            route.params.isEditMode
              ? "Edit Photo"
              : "Add New Plant",
        })}
      />
      <Stack.Screen
        name="PlantDetailsForm"
        component={PlantDetailsForm}
        options={{ title: "Add Plant Details" }}
      />
      <Stack.Screen
        name="PlantDetails"
        component={PlantDetails}
        options={{ title: "Edit Plant Details" }}
      />
    </Stack.Navigator>
  );
};

const AppTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="AppStack"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          const { icon, IconComponent } = NAVBAR_ICONS[route.name];
          return <IconComponent name={icon} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#2D6A4F",
        tabBarInactiveTintColor: "#343A40",
        tabBarStyle: {
          backgroundColor: "#FAF9F6",
          height: 60,
          paddingBottom: 10,
          paddingTop: 5,
          borderTopWidth: 0,
        },
        headerStyle: {
          backgroundColor: "#FAF9F6",
        },
        headerTintColor: "#2D6A4F",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      })}
    >
      <Tab.Screen
        name="AppStack"
        component={AppStack}
        options={{ title: "Plants", headerShown: false }}
      />
      <Tab.Screen name="Profile" component={Profile} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <AppTabs />
    </NavigationContainer>
  );
};

export default AppNavigator;
