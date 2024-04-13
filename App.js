import { useCallback } from "react";
import styled from "styled-components/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import RootNavigator from "./src/screens/RootNavigator";

const SafeAreaWrapper = styled.SafeAreaView`
  flex: 1;
  background-color: #1f2136;
`;

const queryClient = new QueryClient();

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [isLoaded] = useFonts({
    "Satoshi-mid": require("./src/assets/fonts/Satoshi-Medium.otf"),
    "Satoshi-bold": require("./src/assets/fonts/Satoshi-Bold.otf"),
    "Satoshi-xbold": require("./src/assets/fonts/Satoshi-Black.otf"),
  });

  const handleOnLayout = useCallback(async () => {
    if (isLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [isLoaded]);

  if (!isLoaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaWrapper onLayout={handleOnLayout}>
        <RootNavigator />
      </SafeAreaWrapper>
    </QueryClientProvider>
  );
}
