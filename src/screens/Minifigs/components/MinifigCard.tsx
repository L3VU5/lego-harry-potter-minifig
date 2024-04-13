import {
  MinifigCard,
  MinifigImage,
  MinifigTitle,
  MinifigShowDetailsButton,
  DetailsLabel,
} from "../style";

type MinifigCardProps = {
  name: string;
  onPress: () => void;
  isSelected: boolean;
  imgSrc: { uri: string };
  onShowDetailsPress: () => void;
};

export default ({
  name,
  onPress,
  isSelected,
  imgSrc,
  onShowDetailsPress,
}: MinifigCardProps) => (
  <MinifigCard onPress={onPress} isSelected={isSelected}>
    <MinifigImage
      defaultSource={require("../../../assets/minifigFallback.jpg")}
      source={imgSrc}
      resizeMode="contain"
    />
    <MinifigTitle>{name}</MinifigTitle>
    <MinifigShowDetailsButton onPress={onShowDetailsPress}>
      <DetailsLabel>Show details</DetailsLabel>
    </MinifigShowDetailsButton>
  </MinifigCard>
);
