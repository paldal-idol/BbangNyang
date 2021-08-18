import React from 'react';
import AllowDiceAgain from '@/components/organisms/AllowDiceAgain';
import Map from '@organisms/Map';
const BoardGamePage: React.FC = () => {
  return (
    <>
      <p>보드게임 페이지입니다.</p>
      {/* <AllowDiceAgain /> */}
      <Map />
    </>
  );
};

export default BoardGamePage;
