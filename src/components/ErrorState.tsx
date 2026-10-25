import styled from "styled-components/native";

import Button from "./Button";
import Text from "./Text";
import { colors } from "../theme";

const Wrapper = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 32px;
  gap: 12px;
`;

const Title = styled(Text)`
  font-size: 20px;
`;

const Message = styled(Text)`
  text-align: center;
  color: ${colors.textMuted};
  margin-bottom: 12px;
`;

type ErrorStateProps = {
  message: string;
  onRetry?: () => void;
};

export default function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <Wrapper accessibilityRole="alert">
      <Title>Something went wrong</Title>
      <Message>{message}</Message>
      {onRetry && <Button label="TRY AGAIN" onPress={onRetry} />}
    </Wrapper>
  );
}
