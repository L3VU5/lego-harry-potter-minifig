import { useQuery } from "@tanstack/react-query";

import {
  Wrapper,
  Modal,
  Heading,
  Minifig,
  MinifigImage,
  MinifigTitle,
  SetInfo,
  StyledPart,
  PartsText,
  PartsList,
  SubmitButton,
  StyledText,
  ButtonText,
} from "./style";

const OrderSummary = ({ navigation, route }) => {
  const { setNum, orderDetails } = route.params;
  const MINIFIG_SET_ENDPOINT = `https://rebrickable.com/api/v3/lego/minifigs/${setNum}/parts/?key=${process.env.EXPO_PUBLIC_REBRICKABLE_KEY}&search=harry%20potter`;

  const {
    isLoading,
    error,
    data: partsData,
  } = useQuery({
    queryKey: ["setParts"],
    queryFn: () => fetch(MINIFIG_SET_ENDPOINT).then((res) => res.json()),
  });

  function onSubmitButtonPress() {
    console.warn(setNum, orderDetails);
    navigation.navigate("minifigs");
  }

  if (isLoading) return <StyledText>Loading...</StyledText>;

  if (error)
    return <StyledText>{"An error has occurred: " + error.message}</StyledText>;

  return (
    <Wrapper>
      <Modal>
        <Heading>SUMMARY</Heading>
        <Minifig>
          <MinifigImage />
          <MinifigTitle></MinifigTitle>
        </Minifig>
        <SetInfo>
          <PartsText>There are ${2} parts in this minifig:</PartsText>
          <PartsList>
            {partsData.map((part) => (
              <StyledPart item={part} />
            ))}
          </PartsList>
        </SetInfo>
        <SubmitButton onPress={onSubmitButtonPress}>
          <ButtonText>SUBMIT</ButtonText>
        </SubmitButton>
      </Modal>
    </Wrapper>
  );
};

export default OrderSummary;
