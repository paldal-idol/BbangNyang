import React from 'react';
import Allow_dice_again from '@organisms/Allow_dice_again';
import Map from '@organisms/Map';
const BoardGamePage: React.FC = () => {
  return (
    <>
      <p>보드게임 페이지입니다.</p>
      {/* <Allow_dice_again /> */}
      <Map></Map>
    </>
  );
};

export default BoardGamePage;
