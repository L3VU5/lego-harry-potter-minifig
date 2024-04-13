import React from "react";
import { WebView } from "react-native-webview";

import { StyledSafeAreaView } from "./style";

const Browser = ({ route }) => {
  const { uri } = route.params;
  return (
    <StyledSafeAreaView>
      <WebView source={{ uri }} />
    </StyledSafeAreaView>
  );
};

export default Browser;
