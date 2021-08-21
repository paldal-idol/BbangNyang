import React from 'react';
import { useRecoilState } from 'recoil';
import modalState from '@store/modal';
import RuleBookModal from '@molecules/RuleBookModal';
import TextButton from '@atoms/TextButton';

const RuleBookButton: React.FC = () => {
  const [modal, setModal] = useRecoilState(modalState);

  const openModal = () => {
    setModal('RuleBook');
  };

  return (
    <>
      <TextButton onClick={openModal}>Rule Book</TextButton>
      {modal === 'RuleBook' && <RuleBookModal />}
    </>
  );
};

export default RuleBookButton;
