import { useRef } from "react";
import { TextInput } from "react-native";
import { useForm, Controller } from "react-hook-form";

import withKeyboard from "../../hocs/withKeyboard";
import {
  Wrapper,
  Heading,
  Field,
  FieldError,
  FieldLabel,
  StyledTextInput,
  Form,
} from "./style";
import Button from "../../components/Button";
import { emailRegEx, zipCodeRegEx } from "../../constants/regex";

type FormInputs = {
  fullName: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
};

interface OrderDetailsProps {
  navigation: any; // Assuming navigation has a type
  route: {
    params: { setDetails: any }; // Assuming route.params has a type
  };
  hasKeyboard: boolean;
}

const OrderDetails: React.FC<OrderDetailsProps> = ({
  navigation,
  route,
  hasKeyboard,
}) => {
  const setDetails = route.params;
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm<FormInputs>({
    mode: "onTouched",
    defaultValues: {
      fullName: "",
      email: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
    },
  });

  const fullNameRef = useRef<TextInput>(null);
  const emailRef = useRef<TextInput>(null);
  const addressRef = useRef<TextInput>(null);
  const cityRef = useRef<TextInput>(null);
  const stateRef = useRef<TextInput>(null);
  const zipCodeRef = useRef<TextInput>(null);

  const onSubmit = (data: FormInputs) => {
    navigation.navigate("orderSummary", { orderDetails: data, setDetails });
  };

  return (
    <Wrapper>
      {!hasKeyboard && <Heading>PERSONAL DETAILS</Heading>}

      <Form>
        <Field>
          <FieldLabel>Full name</FieldLabel>
          <Controller
            control={control}
            rules={{
              required: "Full name is required.",
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <StyledTextInput
                ref={fullNameRef}
                placeholder="Full name"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                returnKeyType="next"
                onSubmitEditing={() => emailRef.current?.focus()}
              />
            )}
            name="fullName"
          />
          {errors.fullName && (
            <FieldError>{errors.fullName.message}</FieldError>
          )}
        </Field>

        <Field>
          <FieldLabel>Email</FieldLabel>
          <Controller
            control={control}
            rules={{
              required: "Email is required.",
              pattern: {
                value: emailRegEx,
                message: "Invalid email format.",
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <StyledTextInput
                ref={emailRef}
                placeholder="Email"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                returnKeyType="next"
                onSubmitEditing={() => addressRef.current?.focus()}
              />
            )}
            name="email"
          />
          {errors.email && <FieldError>{errors.email.message}</FieldError>}
        </Field>

        <Field>
          <FieldLabel>Address</FieldLabel>
          <Controller
            control={control}
            rules={{
              required: "Address is required.",
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <StyledTextInput
                ref={addressRef}
                placeholder="Address"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                returnKeyType="next"
                onSubmitEditing={() => cityRef.current?.focus()}
              />
            )}
            name="address"
          />
          {errors.address && <FieldError>{errors.address.message}</FieldError>}
        </Field>

        <Field>
          <FieldLabel>City</FieldLabel>
          <Controller
            control={control}
            rules={{
              required: "City is required.",
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <StyledTextInput
                ref={cityRef}
                placeholder="City"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                returnKeyType="next"
                onSubmitEditing={() => stateRef.current?.focus()}
              />
            )}
            name="city"
          />
          {errors.city && <FieldError>{errors.city.message}</FieldError>}
        </Field>

        <Field>
          <FieldLabel>State</FieldLabel>
          <Controller
            control={control}
            rules={{
              required: "State is required.",
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <StyledTextInput
                ref={stateRef}
                placeholder="State"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                returnKeyType="next"
                onSubmitEditing={() => zipCodeRef.current?.focus()}
              />
            )}
            name="state"
          />
          {errors.state && <FieldError>{errors.state.message}</FieldError>}
        </Field>

        <Field>
          <FieldLabel>Zip code</FieldLabel>
          <Controller
            control={control}
            rules={{
              required: "Zip code is required.",
              pattern: {
                value: zipCodeRegEx,
                message: "Invalid zip code format.",
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <StyledTextInput
                ref={zipCodeRef}
                placeholder="Zip code"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                returnKeyType="done"
                onSubmitEditing={handleSubmit(onSubmit)}
              />
            )}
            name="zipCode"
          />
          {errors.zipCode && <FieldError>{errors.zipCode.message}</FieldError>}
        </Field>
      </Form>

      {!hasKeyboard && (
        <Button
          onPress={handleSubmit(onSubmit)}
          disabled={!isValid || !isDirty}
          label="VIEW SUMMARY"
        />
      )}
    </Wrapper>
  );
};

export default withKeyboard(OrderDetails);
