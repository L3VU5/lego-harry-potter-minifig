import styled from "styled-components/native";

import Text from "../Text";

export const Button = styled.Pressable`
  justify-content: center;
  height: 48px;
  padding: 12px 64px;
  background-color: #028dec;
  border-radius: 24px;

  ${({ disabled }) =>
    disabled &&
    `
    opacity: 0.5;
    `}
`;

export const ButtonLabel = styled(Text)`
  color: #fff;
  font-size: 16px;
`;
