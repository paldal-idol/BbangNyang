import styled from "@emotion/styled";

import { Button } from "@/components/common";
import color from "@theme/color";

const GameStartButtonBlock = styled(Button)`
  width: 100%;
  margin: 0px;
`;

type GameStartButtonProps = {
  isAllReady: boolean;
  onClick: VoidFunction;
};

function GameStartButton({ isAllReady, onClick }: GameStartButtonProps) {
  const backgroundColor = isAllReady ? color.button.orange : color.button.gray;
  return (
    <GameStartButtonBlock backgroundColor={backgroundColor} onClick={onClick}>
      게임 시작
    </GameStartButtonBlock>
  );
}

export default GameStartButton;
