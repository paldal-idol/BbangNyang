import * as React from 'react';
import modalState from '@store/modal';
import { useRecoilState } from 'recoil';
import RoundSquareButton from './RoundSquareButton';
import styled from 'styled-components';


const GuideContainer = styled.div`
  position: fixed;
  bottom: 10px;
  right: 10px;
`;

const PageGuideButton: React.FC = () => {

    const [modal, setModal] = useRecoilState(modalState);

    const openModal = () => {
        setModal('BakeryGuide');
    };
    
    return (
        <GuideContainer>
            <RoundSquareButton variant="yellow" size="lg" onClick={openModal}>
                ?
            </RoundSquareButton>
        </GuideContainer>
    );
}

export default PageGuideButton;