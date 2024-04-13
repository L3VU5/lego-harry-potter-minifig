import styled from "styled-components/native";

import Text from "../../components/Text";

export const Wrapper = styled.View`
  flex: 1;
  background-color: #1f2136;
  align-items: center;
  justify-content: space-between;
  padding: 36px 0;
`;

export const DrawWrapper = styled.View`
  flex: 1;
  justify-content: center;
`;

export const CardsList = styled.View`
  height: 300px;
`;

export const StyledText = styled(Text)`
  color: #fff;
`;

export const Heading = styled(StyledText)`
  font-family: Satoshi-xbold;
  font-size: 26px;
`;

export const ButtonText = styled(StyledText)`
  font-size: 16px;
`;

export const ChooseButton = styled.Pressable`
  background-color: #028dec;
  border-radius: 24px;
  justify-content: center;
  padding: 12px 64px;
  height: 48px;
`;

interface MinifigCardProps {
  isSelected: boolean;
}

export const MinifigCard = styled.Pressable<MinifigCardProps>`
  background-color: #fff;
  border-radius: 16px;
  margin: 0 16px;
  padding: 28px 12px;
  justify-content: space-between;
  align-items: center;
  max-height: 280px;
  width: 280px;

  ${({ isSelected }) =>
    isSelected &&
    `
    shadow-color: #fe9037;
    shadow-offset: 0 0;
    shadow-opacity: 1;
    shadow-radius: 8px;
    elevation: 8;
    `}
`;

export const MinifigImage = styled.Image`
  height: 128px;
  width: 128px;
`;

export const MinifigTitle = styled(StyledText)`
  text-align: center;
  color: #000;
`;

export const MinifigShowDetailsButton = styled.Pressable``;

export const DetailsLabel = styled(StyledText)`
  color: #fe9037;
`;
