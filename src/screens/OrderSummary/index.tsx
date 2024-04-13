import { useQuery, useMutation } from "@tanstack/react-query";

import Button from "../../components/Button";
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
  StyledText,
  CloseButton,
  CloseIcon,
  StyledActivityIndicator,
} from "./style";

type OrderSummaryProps = {
  navigation: any;
  route: {
    params: {
      setDetails: SetDetails;
      orderDetails: OrderDetails;
    };
  };
};

type SetDetails = {
  setNum: string;
  minifigImageSrc: string;
  minifigTitle: string;
};

type OrderDetails = {
  fullName: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
};

type Part = {
  id?: string;
};

const OrderSummary: React.FC<OrderSummaryProps> = ({ navigation, route }) => {
  const { setDetails, orderDetails } = route.params;
  const { setNum, minifigImageSrc, minifigTitle } = setDetails;
  const MINIFIG_SET_ENDPOINT = `https://rebrickable.com/api/v3/lego/minifigs/${setNum}/parts/?key=${process.env.EXPO_PUBLIC_REBRICKABLE_KEY}`;

  const submitOrderMutation = (data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("Data sent to backend:", data);
        resolve({ message: "Order submitted successfully!" }); // Mock response
      }, 1000); // Simulate a delay
    });
  };

  const {
    isLoading,
    error,
    data: partsData,
  } = useQuery({
    queryKey: ["parts"],
    queryFn: () => fetch(MINIFIG_SET_ENDPOINT).then((res) => res.json()),
  });
  const {
    mutate,
    isPending: isMutating,
    error: mutationError,
  } = useMutation({
    mutationFn: submitOrderMutation,
    onSuccess: () => navigation.navigate("minifigs"),
  });

  function onSubmitButtonPress() {
    const data = {
      orderDetails,
      setNum: setDetails.setNum,
    };

    mutate(data);
  }

  if (error)
    return <StyledText>{"An error has occurred: " + error.message}</StyledText>;

  return (
    <Wrapper>
      <Modal>
        <CloseButton onPress={() => navigation.pop()}>
          <CloseIcon name="close" size={28} color="black" />
        </CloseButton>
        {isLoading || isMutating ? (
          <StyledActivityIndicator />
        ) : (
          <>
            <Heading>SUMMARY</Heading>

            <Minifig>
              <MinifigImage
                source={{ uri: minifigImageSrc }}
                defaultSource={require("../../assets/minifigFallback.jpg")}
                resizeMode="contain"
              />
              <MinifigTitle>{minifigTitle}</MinifigTitle>
            </Minifig>

            <SetInfo>
              <PartsText>
                There are {partsData?.count} parts in this minifig:
              </PartsText>
              <PartsList>
                {partsData?.results?.map((part: Part) => (
                  <StyledPart key={part?.id} item={part} />
                ))}
              </PartsList>
            </SetInfo>

            {mutationError && (
              <StyledText>Error: {mutationError.message}</StyledText>
            )}

            <Button
              onPress={onSubmitButtonPress}
              disabled={isMutating}
              label="SUBMIT"
            />
          </>
        )}
      </Modal>
    </Wrapper>
  );
};

export default OrderSummary;
