import styled from "styled-components/native";

export const Wrapper = styled.View``;

interface ITextInput {
  ref: any;
}

export const StyledTextInput = styled.TextInput<ITextInput>`
  background-color: #fff;
  padding: 16px;
  font-size: 16px;
  border-radius: 4px;
  width: 100%;
`;
