import { useForm, Controller } from "react-hook-form";

import withKeyboard from "../../hocs/withKeyboard";
import {
  Wrapper,
  Heading,
  ButtonText,
  Field,
  FieldError,
  FieldLabel,
  StyledTextInput,
  ChooseButton,
  Form,
} from "./style";

type FormInputs = {
  fullName: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
};

const OrderDetails = ({ navigation, route, hasKeyboard }) => {
  const { setNum } = route.params;
  const {
    control,
    handleSubmit,
    formState: { errors },
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

  const onSubmit = (data: FormInputs) => {
    navigation.navigate("orderSummary", { orderDetails: data, setNum });
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
                style=""
                placeholder="Full name"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
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
                value:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: "Invalid email format.",
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <StyledTextInput
                style=""
                placeholder="Email"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
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
                style=""
                placeholder="Address"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
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
                style=""
                placeholder="City"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
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
                style=""
                placeholder="State"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
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
                value: /^\d{5}$|^\d{5}-\d{4}$/,
                message: "Invalid zip code format.",
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <StyledTextInput
                style=""
                placeholder="Zip code"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="zipCode"
          />
          {errors.zipCode && <FieldError>{errors.zipCode.message}</FieldError>}
        </Field>
      </Form>
      {!hasKeyboard && (
        <ChooseButton onPress={handleSubmit(onSubmit)}>
          <ButtonText>VIEW SUMMARY</ButtonText>
        </ChooseButton>
      )}
    </Wrapper>
  );
};

export default withKeyboard(OrderDetails);
