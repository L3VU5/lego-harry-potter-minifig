import React, { forwardRef } from "react";
import { TextInputProps } from "react-native";
import { Wrapper, StyledTextInput } from "./style";

const TextInput = forwardRef(
  ({ style, value, onChangeText, ...rest }: TextInputProps, ref) => {
    return (
      <Wrapper style={style}>
        <StyledTextInput
          ref={ref}
          autoCapitalize="none"
          autoCorrect={false}
          value={value}
          onChangeText={onChangeText}
          {...rest}
        />
      </Wrapper>
    );
  }
);

export default TextInput;
