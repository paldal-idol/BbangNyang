import styled from "@emotion/styled";

import { Button } from "@/components/common";
import color from "@theme/color";

const GameSetButtonBlock = styled(Button)`
  width: 100%;
  margin: 0px;
`;

type GameSetButtonProps = {
  isReady: boolean;
  onClick: VoidFunction;
};

function GameSetButton({ isReady, onClick }: GameSetButtonProps) {
  const backgroundColor = isReady ? color.button.gray : color.button.orange;

  return (
    <GameSetButtonBlock backgroundColor={backgroundColor} onClick={onClick}>
      {isReady ? "준비 해제" : "게임 준비"}
    </GameSetButtonBlock>
  );
}

export default GameSetButton;
