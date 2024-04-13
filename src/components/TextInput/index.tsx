import { Wrapper, StyledTextInput } from "./style.js";

const TextInput = ({ style, value, onChangeText, ...rest }) => {
  return (
    <Wrapper style={style}>
      <StyledTextInput
        autoCapitalize="none"
        autoCorrect={false}
        value={value}
        onChangeText={onChangeText}
        {...rest}
      />
    </Wrapper>
  );
};

export default TextInput;
