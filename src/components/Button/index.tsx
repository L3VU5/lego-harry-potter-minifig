import { PressableProps } from "react-native";
import { Button, ButtonLabel } from "./style";

interface Props extends PressableProps {
  label: string;
  isDisabled?: boolean;
}

export default ({ style, isDisabled = false, label, ...rest }: Props) => (
  <Button disabled={isDisabled} {...rest}>
    <ButtonLabel>{label}</ButtonLabel>
  </Button>
);
