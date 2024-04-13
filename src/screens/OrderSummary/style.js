import styled from "styled-components/native";

import Part from "./components/Part";

export const Wrapper = styled.View`
  background-color: #1f2136;
  flex: 1;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
`;

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

export const StyledText = styled.Text`
  color: #fff;
`;

export const Heading = styled(StyledText)`
  font-weight: bold;
  font-size: 28px;
  color: #1f2135;
`;

export const ButtonText = styled(StyledText)`
  font-size: 18px;
  font-weight: bold;
`;

export const SubmitButton = styled.Pressable`
  justify-content: center;
  height: 48px;
  padding: 12px 64px;
  background-color: #028dec;
  border-radius: 24px;
`;

export const StyledPart = styled(Part)``;

export const PartImage = styled.Image``;

export const PartInfo = styled.View``;

export const PartTitle = styled.Text``;

export const PartId = styled.Text``;

export const Minifig = styled.View``;

export const MinifigImage = styled.Image``;

export const MinifigTitle = styled.Text``;

export const SetInfo = styled.View``;

export const PartsText = styled.Text``;

export const PartsList = styled.View``;
