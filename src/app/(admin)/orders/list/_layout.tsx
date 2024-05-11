import { withLayoutContext } from "expo-router";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { SafeAreaView } from "react-native-safe-area-context";

const Tab = withLayoutContext(createMaterialTopTabNavigator().Navigator);

export default function TabIndex() {
  return (
    <SafeAreaView edges={["top"]} style={{ flex: 1, backgroundColor: "white" }}>
      <Tab />
    </SafeAreaView> //Debe ser con default dunction con const no funciona
  );
}
