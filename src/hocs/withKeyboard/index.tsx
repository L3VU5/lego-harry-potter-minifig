import React, { useEffect, useState } from "react";
import { Keyboard, Platform, TouchableWithoutFeedback } from "react-native";

import { StyledKeyboardAvoidingView, View } from "./style";

const withKeyboard = (WrappedComponent) => (props) => {
  const [hasKeyboard, setHasKeyboard] = useState(false);

  useEffect(() => {
    const showSubscription = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow",
      () => {
        setHasKeyboard(true);
      }
    );
    const hideSubscription = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide",
      () => {
        setHasKeyboard(false);
      }
    );
    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return (
    <StyledKeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          <WrappedComponent hasKeyboard={hasKeyboard} {...props} />
        </View>
      </TouchableWithoutFeedback>
    </StyledKeyboardAvoidingView>
  );
};

export default withKeyboard;
