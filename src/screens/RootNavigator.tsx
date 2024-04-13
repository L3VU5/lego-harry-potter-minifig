import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Minifigs from "./Minifigs";
import OrderDetails from "./OrderDetails";
import OrderSummary from "./OrderSummary";
import Browser from "./Browser";

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="minifigs"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="minifigs" component={Minifigs} />
        <Stack.Screen name="orderDetails" component={OrderDetails} />
        <Stack.Screen name="orderSummary" component={OrderSummary} />
        <Stack.Screen
          name="browser"
          component={Browser}
          options={{
            presentation: "modal",
            gestureEnabled: true,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
