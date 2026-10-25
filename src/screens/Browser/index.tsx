import { ActivityIndicator } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { WebView } from "react-native-webview";
import styled from "styled-components/native";

import { colors } from "../../theme";
import type { RootStackParamList } from "../../types";

const Screen = styled.View`
  flex: 1;
  background-color: ${colors.background};
`;

type Props = NativeStackScreenProps<RootStackParamList, "browser">;

export default function Browser({ route }: Props) {
  return (
    <Screen>
      <WebView
        source={{ uri: route.params.uri }}
        startInLoadingState
        renderLoading={() => <ActivityIndicator size="large" color={colors.accent} style={{ flex: 1 }} />}
        style={{ backgroundColor: colors.background }}
      />
    </Screen>
  );
}
