import styled from "styled-components/native";
import { AntDesign } from "@expo/vector-icons";
import Text from "../../components/Text";

import Part from "./components/Part";

export const Wrapper = styled.View`
  background-color: #1f2136;
  flex: 1;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
`;

export const CloseButton = styled.Pressable`
  padding: 16px;
  position: absolute;
  top: 0;
  right: 0;
`;

export const CloseIcon = styled(AntDesign)``;

export const Modal = styled.View`
  flex: 1;
  width: 100%;
  background-color: #fff;
  align-items: center;
  justify-content: space-between;
  padding: 36px;
  box-sizing: border-box;
  border-radius: 16px;
`;

export const StyledText = styled(Text)`
  color: #1f2135;
`;

export const Heading = styled(StyledText)`
  font-family: Satoshi-xbold;
  font-size: 28px;
`;

export const ButtonText = styled(StyledText)`
  color: #fff;
  font-size: 18px;
`;

export const SubmitButton = styled.Pressable`
  justify-content: center;
  height: 48px;
  padding: 12px 64px;
  background-color: #028dec;
  border-radius: 24px;
`;

export const Minifig = styled.View`
  align-items: center;
  margin: 36px 0;
`;

export const MinifigImage = styled.Image`
  height: 128px;
  width: 128px;
`;

export const MinifigTitle = styled(StyledText)`
  font-family: Satoshi-xbold;
  font-size: 18px;
  margin-top: 24px;
  text-align: center;
`;

export const SetInfo = styled.View`
  flex: 1;
`;

export const PartsText = styled(StyledText)`
  font-size: 16px;
`;

export const PartsList = styled.ScrollView`
  flex: 1;
  margin: 24px 0;
`;

export const StyledPart = styled(Part)``;

export const PartWrapper = styled.View`
  flex-direction: row;
  margin-bottom: 12px;
`;

export const PartImage = styled.Image`
  margin-right: 12px;
  height: 48px;
  width: 48px;
`;

export const PartInfo = styled.View`
  justify-content: center;
  flex-shrink: 1;
`;

export const PartTitle = styled(StyledText)`
  margin-bottom: 4px;
`;

export const PartId = styled(StyledText)`
  font-family: Satoshi-mid;
  color: #fe9037;
`;
