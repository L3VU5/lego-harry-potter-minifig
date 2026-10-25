import styled from "styled-components/native";

import Text from "./Text";
import { colors, fonts } from "../theme";

const STEPS = ["Draw", "Details", "Summary"];

const Row = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

const Step = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

const Dot = styled.View<{ $active: boolean; $done: boolean }>`
  width: 22px;
  height: 22px;
  border-radius: 11px;
  align-items: center;
  justify-content: center;
  background-color: ${({ $active, $done }) => ($active ? colors.accent : $done ? colors.primary : colors.surfaceHigh)};
`;

const DotLabel = styled(Text)`
  font-family: ${fonts.black};
  font-size: 12px;
`;

const Label = styled(Text)<{ $active: boolean }>`
  font-size: 13px;
  color: ${({ $active }) => ($active ? colors.text : colors.textMuted)};
`;

const Line = styled.View`
  width: 20px;
  height: 2px;
  border-radius: 1px;
  background-color: ${colors.border};
`;

export default function StepIndicator({ current }: { current: 1 | 2 | 3 }) {
  return (
    <Row accessibilityLabel={`Step ${current} of ${STEPS.length}: ${STEPS[current - 1]}`}>
      {STEPS.map((label, index) => {
        const step = index + 1;
        return (
          <Step key={label}>
            {index > 0 && <Line />}
            <Dot $active={step === current} $done={step < current}>
              <DotLabel>{step}</DotLabel>
            </Dot>
            <Label $active={step === current}>{label}</Label>
          </Step>
        );
      })}
    </Row>
  );
}
