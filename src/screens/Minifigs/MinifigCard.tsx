import styled from "styled-components/native";

import Text from "../../components/Text";
import { colors } from "../../theme";
import type { Minifig } from "../../types";

export const CARD_WIDTH = 252;
export const CARD_GAP = 16;

const Card = styled.Pressable<{ $selected: boolean }>`
  width: ${CARD_WIDTH}px;
  margin: 0 ${CARD_GAP / 2}px;
  padding: 20px 16px 16px;
  align-items: center;
  gap: 12px;
  border-radius: 20px;
  border-width: 3px;
  border-color: ${({ $selected }) => ($selected ? colors.accent : "transparent")};
  background-color: ${colors.card};
`;

const Photo = styled.Image`
  width: 148px;
  height: 148px;
`;

const Name = styled(Text)`
  min-height: 40px;
  text-align: center;
  font-size: 15px;
  color: ${colors.cardText};
`;

const Meta = styled(Text)`
  font-size: 12px;
  color: #6b6f8d;
`;

const DetailsLink = styled.Pressable`
  padding: 6px 12px;
`;

const DetailsLabel = styled(Text)`
  color: #d9650a;
  font-size: 14px;
`;

type MinifigCardProps = {
  minifig: Minifig;
  selected: boolean;
  onSelect: () => void;
  onShowDetails: () => void;
};

export default function MinifigCard({ minifig, selected, onSelect, onShowDetails }: MinifigCardProps) {
  return (
    <Card
      onPress={onSelect}
      $selected={selected}
      accessibilityRole="radio"
      accessibilityState={{ selected }}
      accessibilityLabel={minifig.name}
    >
      <Photo
        source={minifig.set_img_url ? { uri: minifig.set_img_url } : require("../../assets/minifigFallback.jpg")}
        defaultSource={require("../../assets/minifigFallback.jpg")}
        resizeMode="contain"
      />
      <Name numberOfLines={3}>{minifig.name}</Name>
      <Meta>{minifig.num_parts} parts</Meta>
      <DetailsLink onPress={onShowDetails} accessibilityRole="link" hitSlop={8}>
        <DetailsLabel>Show details</DetailsLabel>
      </DetailsLink>
    </Card>
  );
}
