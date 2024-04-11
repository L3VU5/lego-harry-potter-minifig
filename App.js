import styled from "styled-components/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import RootNavigator from "./src/screens/RootNavigator";

const SafeAreaWrapper = styled.SafeAreaView`
  flex: 1;
  background-color: #1f2136;
`;

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaWrapper>
        <RootNavigator />
      </SafeAreaWrapper>
    </QueryClientProvider>
  );
}
