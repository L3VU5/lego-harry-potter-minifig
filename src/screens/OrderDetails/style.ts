import styled from "styled-components/native";

import TextInput from "../../components/TextInput";
import Text from "../../components/Text";

export const Wrapper = styled.View`
  flex: 1;
  background-color: #1f2136;
  align-items: center;
  justify-content: space-between;
  padding: 36px 0;
`;

export const StyledText = styled(Text)`
  color: #fff;
`;

export const Heading = styled(StyledText)`
  font-family: Satoshi-xbold;
  font-size: 28px;
  line-height: 40px;
  height: 40px;
`;

export const ButtonText = styled(StyledText)`
  font-size: 18px;
`;

export const Field = styled.View`
  margin-bottom: 12px;
`;

export const FieldError = styled(StyledText)`
  color: #ff5502;
  font-size: 14px;
  margin-top: 4px;
`;

export const FieldLabel = styled(StyledText)`
  color: #fff;
  font-size: 14px;
  margin-bottom: 8px;
`;

export const StyledTextInput = styled(TextInput)``;

export const ChooseButton = styled.Pressable`
  justify-content: center;
  height: 48px;
  padding: 12px 64px;
  background-color: #028dec;
  border-radius: 24px;
`;

export const Form = styled.ScrollView`
  margin: 24px;
  width: 100%;
  flex: 1;
  padding: 0 32px;
`;
