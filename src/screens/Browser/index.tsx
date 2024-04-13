import React from "react";
import { WebView } from "react-native-webview";
import styled from "styled-components/native";

const StyledSafeAreaView = styled.SafeAreaView`
  flex: 1;
`;

const Browser = ({ route }) => {
  const { uri } = route.params;
  return (
    <StyledSafeAreaView>
      <WebView source={{ uri }} />
    </StyledSafeAreaView>
  );
};

export default Browser;
