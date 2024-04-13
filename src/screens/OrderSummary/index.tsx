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
  CloseButton,
  CloseIcon,
} from "./style";

const OrderSummary = ({ navigation, route }) => {
  const { setDetails, orderDetails } = route.params;
  const { setNum, minifigImageSrc, minifigTitle } = setDetails;
  const MINIFIG_SET_ENDPOINT = `https://rebrickable.com/api/v3/lego/minifigs/${setNum}/parts/?key=${process.env.EXPO_PUBLIC_REBRICKABLE_KEY}&search=harry%20potter`;

  const {
    isLoading,
    error,
    data: partsData,
  } = useQuery({
    queryKey: ["parts"],
    queryFn: () => fetch(MINIFIG_SET_ENDPOINT).then((res) => res.json()),
  });

  function onSubmitButtonPress() {
    console.warn(setDetails, orderDetails);
    navigation.navigate("minifigs");
  }

  if (isLoading) return <StyledText>Loading...</StyledText>;

  if (error)
    return <StyledText>{"An error has occurred: " + error.message}</StyledText>;

  return (
    <Wrapper>
      <Modal>
        <CloseButton onPress={() => navigation.pop()}>
          <CloseIcon name="close" size={28} color="black" />
        </CloseButton>
        <Heading>SUMMARY</Heading>
        <Minifig>
          <MinifigImage source={{ uri: minifigImageSrc }} />
          <MinifigTitle>{minifigTitle}</MinifigTitle>
        </Minifig>
        <SetInfo>
          <PartsText>
            There are {partsData?.count} parts in this minifig:
          </PartsText>
          <PartsList>
            {partsData?.results?.map((part) => (
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
