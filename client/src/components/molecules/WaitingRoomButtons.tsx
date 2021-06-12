import * as React from 'react';
import { Link } from 'react-router-dom';
import RoundSquareButton from '../atoms/RoundSquareButton';
import CircleButton from '../atoms/CircleButton';
type Props = {
  disabled: boolean;
  size: string;
  variant: string;
  children: React.ReactNode;
};
function WaitingRoomButtons(Props) {
  return (
    <div>
      <div>
        <CircleButton variant="gray" size="sm">
          x
        </CircleButton>

        <Link onClick="goRobby()" to="/">
          <RoundSquareButton variant="bbang" size="lg">
            로비로 돌아가기
          </RoundSquareButton>
        </Link>
      </div>
      <div>
        <RoundSquareButton variant="bbang" size="lg">
          Ready
        </RoundSquareButton>
        <RoundSquareButton variant="bbang" size="md">
          도움말
        </RoundSquareButton>
      </div>
      <div></div>
    </div>
  );
}
function goRobby() {}

export default WaitingRoomButtons;
