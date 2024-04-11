import styled from "styled-components/native";

const Wrapper = styled.View`
  flex: 1;
  background-color: #1f2136;
  align-items: center;
  justify-content: space-between;
`;

const StyledText = styled.Text`
  color: #fff;
`;

const Heading = styled(StyledText)`
  font-weight: bold;
  font-size: 28px;
`;

const ButtonText = styled(StyledText)`
  font-size: 18px;
  font-weight: bold;
`;

const ChooseButton = styled.Pressable`
  justify-content: center;
  height: 48px;
  padding: 12px 64px;
  background-color: #028dec;
  border-radius: 24px;
`;

const OrderSummary = ({ navigation }) => {
  return (
    <Wrapper>
      <Heading>SUMMARY</Heading>
      <ChooseButton onPress={() => navigation.navigate("minifigs")}>
        <ButtonText>SUBMIT</ButtonText>
      </ChooseButton>
    </Wrapper>
  );
};

export default OrderSummary;
