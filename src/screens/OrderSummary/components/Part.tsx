import { ViewProps } from "react-native";

import { PartWrapper, PartImage, PartInfo, PartTitle, PartId } from "../style";

interface PartProps extends ViewProps {
  item: any;
}

export default ({ style, item }: PartProps) => (
  <PartWrapper style={style}>
    <PartImage source={{ uri: item.part.part_img_url }} />
    <PartInfo>
      <PartTitle numberOfLines={1}>{item.part.name}</PartTitle>
      <PartId>{item.id}</PartId>
    </PartInfo>
  </PartWrapper>
);
