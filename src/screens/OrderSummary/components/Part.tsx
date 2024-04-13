import { ViewProps } from "react-native";

import { PartWrapper, PartImage, PartInfo, PartTitle, PartId } from "../style";

interface PartProps extends ViewProps {
  item: any;
}

export default ({ style, item }: PartProps) => {
  return (
    <PartWrapper style={style} key={item.id}>
      <PartImage source={{ uri: item.part.part_img_url }} />
      <PartInfo>
        <PartTitle numberOfLines={1}>{item.part.name}</PartTitle>
        <PartId>{item.id}</PartId>
      </PartInfo>
    </PartWrapper>
  );
};
