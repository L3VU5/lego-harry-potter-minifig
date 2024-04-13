import { Part, PartImage, PartInfo, PartTitle, PartId } from "../style";

export default ({ item }) => {
  return (
    <Part>
      <PartImage source={{ uri: item.part.part_img_url }} />
      <PartInfo>
        <PartTitle>{item.part.name}</PartTitle>
        <PartId>{item.id}</PartId>
      </PartInfo>
    </Part>
  );
};
