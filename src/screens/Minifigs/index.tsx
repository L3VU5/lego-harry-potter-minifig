import { useState, useCallback } from "react";
import { FlatList } from "react-native";
import { useQuery } from "@tanstack/react-query";

import { selectRandomIndices } from "../../utils/helpers";
import {
  Wrapper,
  DrawWrapper,
  StyledText,
  Heading,
  ButtonText,
  ChooseButton,
  MinifigCard,
  MinifigImage,
  MinifigTitle,
  MinifigShowDetailsButton,
  DetailsLabel,
  CardsList,
} from "./style";

const MINIFIGS_ENDPOINT = `https://rebrickable.com/api/v3/lego/minifigs/?key=${process.env.EXPO_PUBLIC_REBRICKABLE_KEY}&search=harry%20potter`;

interface Minifig {
  set_num: string;
  name: string;
  num_parts: number;
  set_img_url: string;
  set_url: string;
  last_modified_dt: string;
}

const Minifigs = ({ navigation }) => {
  const {
    isLoading,
    error,
    data: minifigsData,
  } = useQuery({
    queryKey: ["minifigs"],
    queryFn: () => fetch(MINIFIGS_ENDPOINT).then((res) => res.json()),
  });

  const [drawedMinifigs, setDrawedMinifigs] = useState<Minifig[]>([]);
  const [selectedMinifigId, setSelectedMinifigId] = useState<number>(null);

  const selectRandomMinifigs = useCallback(() => {
    const { results, count } = minifigsData;

    if (!minifigsData) return;

    const randomIndices = selectRandomIndices(count, 5); // Select 5 random indices
    const selected = results.filter((_: any, index: number) =>
      randomIndices.includes(index)
    );

    setDrawedMinifigs(selected);
  }, [minifigsData, selectRandomIndices]);

  const onShowDetailsPress = useCallback((detailsUrl: string) => {
    navigation.navigate("browser", { uri: detailsUrl });
  }, []);

  const onChooseButtonPress: () => void = () => {
    const {
      set_num: setNum,
      set_img_url: minifigImageSrc,
      name: minifigTitle,
    } = drawedMinifigs[selectedMinifigId];

    setDrawedMinifigs([]);
    setSelectedMinifigId(null);

    navigation.navigate("orderDetails", {
      setNum,
      minifigImageSrc,
      minifigTitle,
    });
  };

  const renderItem = useCallback(
    ({ item, index }) => (
      <MinifigCard
        onPress={() => setSelectedMinifigId(index)}
        isSelected={index === selectedMinifigId}
      >
        <MinifigImage
          defaultSource={require("../../assets/minifigFallback.jpg")}
          source={{ uri: item.set_img_url }}
          resizeMode="contain"
        />
        <MinifigTitle>{item.name}</MinifigTitle>
        <MinifigShowDetailsButton
          onPress={() => onShowDetailsPress(item.set_url)}
        >
          <DetailsLabel>Show details</DetailsLabel>
        </MinifigShowDetailsButton>
      </MinifigCard>
    ),
    [selectedMinifigId]
  );

  if (isLoading) return <StyledText>Loading...</StyledText>;

  if (error)
    return <StyledText>{"An error has occurred: " + error.message}</StyledText>;

  return (
    <Wrapper>
      {drawedMinifigs.length ? (
        <>
          <Heading>CHOOSE YOUR MINIFIG</Heading>
          <CardsList>
            <FlatList
              horizontal
              data={drawedMinifigs}
              contentContainerStyle={{ paddingVertical: 16 }}
              contentInsetAdjustmentBehavior="always"
              snapToInterval={280 + 32}
              contentInset={{
                top: 0,
                left: 52,
                bottom: 0,
                right: 52,
              }}
              snapToAlignment="center"
              decelerationRate="fast"
              automaticallyAdjustContentInsets={false}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              scrollEventThrottle={1}
              renderItem={renderItem}
            />
          </CardsList>
          <ChooseButton
            disabled={selectedMinifigId === null}
            onPress={onChooseButtonPress}
          >
            <ButtonText>CHOOSE FIGURE</ButtonText>
          </ChooseButton>
        </>
      ) : (
        <DrawWrapper>
          <ChooseButton onPress={selectRandomMinifigs}>
            <ButtonText>DRAW FREE MINIFIG</ButtonText>
          </ChooseButton>
        </DrawWrapper>
      )}
    </Wrapper>
  );
};

export default Minifigs;
