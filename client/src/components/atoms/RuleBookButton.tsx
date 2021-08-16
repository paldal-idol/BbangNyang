import React from 'react';
import { useRecoilState } from 'recoil';
import modalState from '@store/modal';
import RuleBookModal from '@molecules/RuleBookModal';
import RoundSquareButton from './RoundSquareButton';

const RuleBookButton: React.FC = () => {
  const [modal, setModal] = useRecoilState(modalState);

  const openModal = () => {
    setModal('RuleBook');
  };

  return (
    <>
      <RoundSquareButton variant="yellow" size="lg" onClick={openModal}>Rule Book</RoundSquareButton>
      {modal === 'RuleBook' && <RuleBookModal />}
    </>
  );
};

export default RuleBookButton;
