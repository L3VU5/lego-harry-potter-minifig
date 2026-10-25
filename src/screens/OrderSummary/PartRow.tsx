import { Image } from "react-native";
import styled from "styled-components/native";

import Text from "../../components/Text";
import { colors } from "../../theme";
import type { MinifigPart } from "../../types";

const Row = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 12px;
  padding: 8px 12px;
  border-radius: 12px;
  background-color: ${colors.surface};
`;

const Thumb = styled(Image)`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background-color: #fff;
`;

const Info = styled.View`
  flex: 1;
`;

const Name = styled(Text)`
  font-size: 14px;
`;

const PartNum = styled(Text)`
  font-size: 12px;
  color: ${colors.textMuted};
`;

export default function PartRow({ item }: { item: MinifigPart }) {
  return (
    <Row>
      <Thumb
        source={item.part.part_img_url ? { uri: item.part.part_img_url } : require("../../assets/minifigFallback.jpg")}
        resizeMode="contain"
      />
      <Info>
        <Name numberOfLines={1}>{item.part.name}</Name>
        <PartNum>Part {item.part.part_num}</PartNum>
      </Info>
    </Row>
  );
}
