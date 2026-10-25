import { DarkTheme, NavigationContainer, type Theme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { colors, fonts } from "../theme";
import type { RootStackParamList } from "../types";
import Browser from "./Browser";
import Minifigs from "./Minifigs";
import OrderDetails from "./OrderDetails";
import OrderSummary from "./OrderSummary";

const Stack = createNativeStackNavigator<RootStackParamList>();

const theme: Theme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: colors.accent,
    background: colors.background,
    card: colors.background,
    text: colors.text,
    border: colors.border,
  },
};

export default function RootNavigator() {
  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator
        initialRouteName="minifigs"
        screenOptions={{
          headerShadowVisible: false,
          headerBackButtonDisplayMode: "minimal",
          headerTitleStyle: { fontFamily: fonts.bold },
          contentStyle: { backgroundColor: colors.background },
        }}
      >
        <Stack.Screen name="minifigs" component={Minifigs} options={{ headerShown: false }} />
        <Stack.Screen name="orderDetails" component={OrderDetails} options={{ title: "Delivery" }} />
        <Stack.Screen name="orderSummary" component={OrderSummary} options={{ title: "Summary" }} />
        <Stack.Screen
          name="browser"
          component={Browser}
          options={{ title: "Minifig details", presentation: "modal", gestureEnabled: true }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
