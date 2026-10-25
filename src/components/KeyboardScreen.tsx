import { useEffect, useState, type ReactNode } from "react";
import { Keyboard, Platform, TouchableWithoutFeedback } from "react-native";
import styled from "styled-components/native";

const Avoiding = styled.KeyboardAvoidingView`
  flex: 1;
`;

const Fill = styled.View`
  flex: 1;
`;

type KeyboardScreenProps = {
  children: (hasKeyboard: boolean) => ReactNode;
};

// Moves the content above the keyboard, dismisses it on tap and tells the children when it is open.
export default function KeyboardScreen({ children }: KeyboardScreenProps) {
  const [hasKeyboard, setHasKeyboard] = useState(false);

  useEffect(() => {
    const ios = Platform.OS === "ios";
    const show = Keyboard.addListener(ios ? "keyboardWillShow" : "keyboardDidShow", () => setHasKeyboard(true));
    const hide = Keyboard.addListener(ios ? "keyboardWillHide" : "keyboardDidHide", () => setHasKeyboard(false));
    return () => {
      show.remove();
      hide.remove();
    };
  }, []);

  return (
    <Avoiding behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <Fill>{children(hasKeyboard)}</Fill>
      </TouchableWithoutFeedback>
    </Avoiding>
  );
}
