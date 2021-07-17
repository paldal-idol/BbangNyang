import React from 'react';
import { useRecoilState } from 'recoil';
import modalState from '@store/modal';
import RuleBookModal from '@molecules/RuleBookModal';

const RuleBookButton: React.FC = () => {
  const [modal, setModal] = useRecoilState(modalState);

  const openModal = () => {
    setModal('RuleBook');
  };

  return (
    <>
      <button onClick={openModal}>Rule Book</button>
      {modal === 'RuleBook' && <RuleBookModal />}
    </>
  );
};

export default RuleBookButton;
