import { ActivityIndicator, Image, ScrollView } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useMutation } from "@tanstack/react-query";
import styled from "styled-components/native";

import { useMinifigParts } from "../../api/rebrickable";
import Button from "../../components/Button";
import ErrorState from "../../components/ErrorState";
import StepIndicator from "../../components/StepIndicator";
import Text from "../../components/Text";
import { colors, fonts } from "../../theme";
import type { OrderDetails, RootStackParamList } from "../../types";
import PartRow from "./PartRow";

const Screen = styled.View`
  flex: 1;
  padding: 16px 24px 32px;
  gap: 16px;
  background-color: ${colors.background};
`;

const Heading = styled(Text)`
  margin-top: 4px;
  text-align: center;
  font-family: ${fonts.black};
  font-size: 24px;
`;

const Summary = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 16px;
  padding: 12px;
  border-radius: 16px;
  background-color: ${colors.card};
`;

const Photo = styled(Image)`
  width: 72px;
  height: 72px;
`;

const Title = styled(Text)`
  flex: 1;
  color: ${colors.cardText};
`;

const Block = styled.View`
  gap: 4px;
`;

const Caption = styled(Text)`
  font-size: 13px;
  color: ${colors.textMuted};
`;

const Value = styled(Text)`
  font-family: ${fonts.medium};
  font-size: 15px;
`;

const Parts = styled.View`
  gap: 8px;
`;

const Failure = styled(Text)`
  text-align: center;
  color: ${colors.danger};
`;

const Center = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

type Props = NativeStackScreenProps<RootStackParamList, "orderSummary">;

// There is no backend: the order is only simulated so the whole flow can be tried out.
const submitOrder = (order: { setNum: string; orderDetails: OrderDetails }) =>
  new Promise<{ message: string }>((resolve) => {
    setTimeout(() => resolve({ message: `Order for ${order.setNum} received` }), 1000);
  });

export default function OrderSummary({ navigation, route }: Props) {
  const { minifig, orderDetails } = route.params;
  const { data: parts, isPending, error, refetch } = useMinifigParts(minifig.setNum);

  const { mutate, isPending: isSubmitting, error: submitError } = useMutation({
    mutationFn: submitOrder,
    onSuccess: () => navigation.popTo("minifigs"),
  });

  if (error) {
    return (
      <Screen>
        <ErrorState message={error.message} onRetry={() => refetch()} />
      </Screen>
    );
  }

  if (isPending || isSubmitting) {
    return (
      <Screen>
        <Center>
          <ActivityIndicator size="large" color={colors.accent} />
          {isSubmitting && <Caption style={{ marginTop: 16 }}>Sending your order…</Caption>}
        </Center>
      </Screen>
    );
  }

  return (
    <Screen>
      <Heading>Your free minifig</Heading>
      <StepIndicator current={3} />

      <Summary>
        <Photo
          source={minifig.imageUrl ? { uri: minifig.imageUrl } : require("../../assets/minifigFallback.jpg")}
          defaultSource={require("../../assets/minifigFallback.jpg")}
          resizeMode="contain"
        />
        <Title numberOfLines={3}>{minifig.title}</Title>
      </Summary>

      <Block>
        <Caption>Ships to</Caption>
        <Value>{orderDetails.fullName}</Value>
        <Value>
          {orderDetails.address}, {orderDetails.city}, {orderDetails.state} {orderDetails.zipCode}
        </Value>
      </Block>

      <Caption>This minifig has {parts.count} parts:</Caption>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 8 }}>
        <Parts>
          {parts.results.map((part) => (
            <PartRow key={part.id} item={part} />
          ))}
        </Parts>
      </ScrollView>

      {submitError && <Failure>{submitError.message}</Failure>}
      <Button label="SUBMIT ORDER" onPress={() => mutate({ setNum: minifig.setNum, orderDetails })} />
    </Screen>
  );
}
