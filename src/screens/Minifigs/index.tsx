import { useCallback, useState } from "react";
import { ActivityIndicator, FlatList, Image, useWindowDimensions } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";

import { useMinifigs } from "../../api/rebrickable";
import Button from "../../components/Button";
import ErrorState from "../../components/ErrorState";
import StepIndicator from "../../components/StepIndicator";
import Text from "../../components/Text";
import { colors, fonts } from "../../theme";
import type { Minifig, RootStackParamList } from "../../types";
import { pickRandom } from "../../utils/helpers";
import MinifigCard, { CARD_GAP, CARD_WIDTH } from "./MinifigCard";

const DRAW_SIZE = 5;

const Screen = styled(SafeAreaView)`
  flex: 1;
  padding: 16px 0 16px;
  background-color: ${colors.background};
`;

const Center = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0 32px;
  gap: 16px;
`;

const Hero = styled(Image)`
  width: 132px;
  height: 132px;
  border-radius: 28px;
`;

const Title = styled(Text)`
  font-family: ${fonts.black};
  font-size: 30px;
  text-align: center;
`;

const Subtitle = styled(Text)`
  max-width: 300px;
  margin-bottom: 8px;
  text-align: center;
  color: ${colors.textMuted};
`;

const Body = styled.View`
  flex: 1;
  align-items: center;
`;

const Header = styled.View`
  align-items: center;
  gap: 16px;
  margin-top: 12px;
`;

const Heading = styled(Title)`
  font-size: 24px;
`;

const Middle = styled.View`
  flex: 1;
  justify-content: center;
`;

const Actions = styled.View`
  align-items: center;
  gap: 4px;
`;

type Props = NativeStackScreenProps<RootStackParamList, "minifigs">;

export default function Minifigs({ navigation }: Props) {
  const { data, isPending, error, refetch } = useMinifigs();
  const [drawn, setDrawn] = useState<Minifig[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const { width } = useWindowDimensions();
  // Lets the first and last card sit in the middle of the screen when the list is scrolled to its ends.
  const sidePadding = Math.max((width - CARD_WIDTH) / 2 - CARD_GAP / 2, 16);

  const draw = useCallback(() => {
    if (!data?.results.length) return;
    setSelectedId(null);
    setDrawn(pickRandom(data.results, DRAW_SIZE));
  }, [data]);

  const choose = () => {
    const selected = drawn.find((minifig) => minifig.set_num === selectedId);
    if (!selected) return;

    navigation.navigate("orderDetails", {
      minifig: { setNum: selected.set_num, title: selected.name, imageUrl: selected.set_img_url },
    });
  };

  if (isPending) {
    return (
      <Screen>
        <Center>
          <ActivityIndicator size="large" color={colors.accent} />
        </Center>
      </Screen>
    );
  }

  if (error) {
    return (
      <Screen>
        <ErrorState message={error.message} onRetry={() => refetch()} />
      </Screen>
    );
  }

  if (drawn.length === 0) {
    return (
      <Screen>
        <Center>
          <Hero source={require("../../assets/minifigFallback.jpg")} />
          <Title>Harry Potter{"\n"}Minifigs</Title>
          <Subtitle>
            Draw {DRAW_SIZE} random minifigures out of {data.count} and pick one to get for free.
          </Subtitle>
          <Button label="DRAW FREE MINIFIG!" onPress={draw} />
        </Center>
      </Screen>
    );
  }

  return (
    <Screen>
      <Body>
        <Header>
          <Heading>Choose your minifig</Heading>
          <StepIndicator current={1} />
        </Header>

        <Middle>
          <FlatList
            horizontal
            data={drawn}
            keyExtractor={(minifig) => minifig.set_num}
            extraData={selectedId}
            style={{ flexGrow: 0 }}
            contentContainerStyle={{ paddingHorizontal: sidePadding, paddingVertical: 16 }}
            snapToInterval={CARD_WIDTH + CARD_GAP}
            decelerationRate="fast"
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <MinifigCard
                minifig={item}
                selected={item.set_num === selectedId}
                onSelect={() => setSelectedId(item.set_num)}
                onShowDetails={() => navigation.navigate("browser", { uri: item.set_url })}
              />
            )}
          />
        </Middle>

        <Actions>
          <Button label="CHOOSE FIGURE" disabled={selectedId === null} onPress={choose} />
          <Button label="Draw again" variant="ghost" onPress={draw} style={{ borderWidth: 0 }} />
        </Actions>
      </Body>
    </Screen>
  );
}
