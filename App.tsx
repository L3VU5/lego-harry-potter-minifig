import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

import RootNavigator from "./src/screens/RootNavigator";

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 1 } },
});

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    "Satoshi-mid": require("./src/assets/fonts/Satoshi-Medium.otf"),
    "Satoshi-bold": require("./src/assets/fonts/Satoshi-Bold.otf"),
    "Satoshi-xbold": require("./src/assets/fonts/Satoshi-Black.otf"),
  });

  const ready = fontsLoaded || !!fontError;

  useEffect(() => {
    if (ready) SplashScreen.hideAsync();
  }, [ready]);

  if (!ready) return null;

  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <StatusBar style="light" />
        <RootNavigator />
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}
