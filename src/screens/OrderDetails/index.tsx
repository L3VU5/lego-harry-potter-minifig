import { useRef } from "react";
import { ScrollView } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Controller, useForm } from "react-hook-form";
import styled from "styled-components/native";

import Button from "../../components/Button";
import KeyboardScreen from "../../components/KeyboardScreen";
import StepIndicator from "../../components/StepIndicator";
import Text from "../../components/Text";
import TextField, { type TextFieldHandle } from "../../components/TextField";
import { emailRegEx, zipCodeRegEx } from "../../constants/regex";
import { colors, fonts } from "../../theme";
import type { OrderDetails as OrderDetailsData, RootStackParamList } from "../../types";

const Screen = styled.View`
  flex: 1;
  padding: 16px 24px 32px;
  gap: 20px;
  background-color: ${colors.background};
`;

const Heading = styled(Text)`
  margin-top: 4px;
  text-align: center;
  font-family: ${fonts.black};
  font-size: 24px;
`;

const Chosen = styled(Text)`
  text-align: center;
  color: ${colors.textMuted};
  font-size: 14px;
`;

const Form = styled.View`
  gap: 14px;
`;

const Row = styled.View`
  flex-direction: row;
  gap: 12px;
`;

const Half = styled.View`
  flex: 1;
`;

type FieldName = keyof OrderDetailsData;

type Props = NativeStackScreenProps<RootStackParamList, "orderDetails">;

export default function OrderDetails({ navigation, route }: Props) {
  const { minifig } = route.params;
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<OrderDetailsData>({
    mode: "onTouched",
    defaultValues: { fullName: "", email: "", address: "", city: "", state: "", zipCode: "" },
  });

  const refs = useRef<Partial<Record<FieldName, TextFieldHandle | null>>>({});

  const onSubmit = (orderDetails: OrderDetailsData) => {
    navigation.navigate("orderSummary", { minifig, orderDetails });
  };

  // Renders one controlled field and moves the focus to `next` (or submits on the last one).
  const field = (
    name: FieldName,
    label: string,
    rules: { pattern?: RegExp; message?: string },
    next: FieldName | null,
    inputProps: Partial<React.ComponentProps<typeof TextField>> = {}
  ) => (
    <Controller
      control={control}
      name={name}
      rules={{
        required: `${label} is required.`,
        pattern: rules.pattern ? { value: rules.pattern, message: rules.message ?? "Invalid format." } : undefined,
      }}
      render={({ field: { onChange, onBlur, value } }) => (
        <TextField
          ref={(input) => {
            refs.current[name] = input;
          }}
          label={label}
          value={value}
          onChangeText={onChange}
          onBlur={onBlur}
          error={errors[name]?.message}
          returnKeyType={next ? "next" : "done"}
          onSubmitEditing={() => (next ? refs.current[next]?.focus() : handleSubmit(onSubmit)())}
          {...inputProps}
        />
      )}
    />
  );

  return (
    <KeyboardScreen>
      {(hasKeyboard) => (
        <Screen>
          {!hasKeyboard && (
            <>
              <Heading>Where should we send it?</Heading>
              <StepIndicator current={2} />
              <Chosen numberOfLines={1}>{minifig.title}</Chosen>
            </>
          )}

          <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
            <Form>
              {field("fullName", "Full name", {}, "email", { autoComplete: "name", textContentType: "name" })}
              {field("email", "Email", { pattern: emailRegEx, message: "Invalid email format." }, "address", {
                autoCapitalize: "none",
                autoCorrect: false,
                keyboardType: "email-address",
                autoComplete: "email",
                textContentType: "emailAddress",
              })}
              {field("address", "Address", {}, "city", { autoComplete: "street-address" })}
              {field("city", "City", {}, "state")}
              <Row>
                <Half>{field("state", "State", {}, "zipCode")}</Half>
                <Half>
                  {field("zipCode", "Zip code", { pattern: zipCodeRegEx, message: "Use 12345 or 12345-6789." }, null, {
                    keyboardType: "numbers-and-punctuation",
                    autoComplete: "postal-code",
                  })}
                </Half>
              </Row>
            </Form>
          </ScrollView>

          {!hasKeyboard && <Button label="VIEW SUMMARY" disabled={!isValid} onPress={() => handleSubmit(onSubmit)()} />}
        </Screen>
      )}
    </KeyboardScreen>
  );
}
