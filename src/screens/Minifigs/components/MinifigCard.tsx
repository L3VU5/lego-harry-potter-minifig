import {
  MinifigCard,
  MinifigImage,
  MinifigTitle,
  MinifigShowDetailsButton,
  DetailsLabel,
} from "../style";

export default ({ name, onPress, isSelected, imgSrc, onShowDetailsPress }) => (
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
