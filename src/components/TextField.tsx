import { forwardRef, type ComponentRef } from "react";
import type { TextInput as RNTextInput, TextInputProps } from "react-native";
import styled from "styled-components/native";

import Text from "./Text";
import { colors, fonts } from "../theme";

const Field = styled.View`
  gap: 6px;
`;

const Label = styled(Text)`
  font-size: 13px;
  color: ${colors.textMuted};
`;

const Input = styled.TextInput<{ $invalid: boolean }>`
  min-height: 50px;
  padding: 12px 16px;
  border-radius: 12px;
  border-width: 1.5px;
  border-color: ${({ $invalid }) => ($invalid ? colors.danger : colors.border)};
  background-color: ${colors.surface};
  color: ${colors.text};
  font-family: ${fonts.medium};
  font-size: 16px;
`;

const ErrorText = styled(Text)`
  font-size: 12px;
  color: ${colors.danger};
`;

type TextFieldProps = TextInputProps & {
  label: string;
  error?: string;
};

export type TextFieldHandle = ComponentRef<typeof RNTextInput>;

const TextField = forwardRef<TextFieldHandle, TextFieldProps>(({ label, error, ...rest }, ref) => (
  <Field>
    <Label>{label}</Label>
    <Input
      ref={ref}
      accessibilityLabel={label}
      placeholderTextColor={colors.textMuted}
      selectionColor={colors.accent}
      keyboardAppearance="dark"
      $invalid={!!error}
      {...rest}
    />
    {error ? <ErrorText accessibilityRole="alert">{error}</ErrorText> : null}
  </Field>
));

TextField.displayName = "TextField";

export default TextField;
