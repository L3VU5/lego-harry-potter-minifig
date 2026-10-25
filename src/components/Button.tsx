import type { PressableProps } from "react-native";
import styled from "styled-components/native";

import Text from "./Text";
import { colors } from "../theme";

type Variant = "primary" | "ghost";

type ButtonProps = PressableProps & {
  label: string;
  variant?: Variant;
};

const Container = styled.Pressable<{ $variant: Variant; $disabled: boolean }>`
  justify-content: center;
  align-items: center;
  min-height: 52px;
  padding: 12px 40px;
  border-radius: 26px;
  background-color: ${({ $variant }) => ($variant === "primary" ? colors.primary : "transparent")};
  border-width: ${({ $variant }) => ($variant === "primary" ? 0 : 1.5)}px;
  border-color: ${colors.border};
  opacity: ${({ $disabled }) => ($disabled ? 0.45 : 1)};
`;

const Label = styled(Text)<{ $variant: Variant }>`
  font-size: 16px;
  letter-spacing: 0.5px;
  color: ${({ $variant }) => ($variant === "primary" ? "#fff" : colors.textMuted)};
`;

export default function Button({ label, variant = "primary", disabled, style, ...rest }: ButtonProps) {
  return (
    <Container
      accessibilityRole="button"
      accessibilityState={{ disabled: !!disabled }}
      disabled={disabled}
      $variant={variant}
      $disabled={!!disabled}
      style={({ pressed }) => [{ transform: [{ scale: pressed ? 0.97 : 1 }] }, typeof style === "function" ? undefined : style]}
      {...rest}
    >
      <Label $variant={variant}>{label}</Label>
    </Container>
  );
}
