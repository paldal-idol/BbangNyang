import React from 'react';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import pageGuideState from '@store/pageGuide';

const PageGuideContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  
`;

const PageGuideBackground = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: #00000090;
  z-index: 2000;
`;

const GuideContent = styled.div`
  z-index: 3000;
`;

// 1. 가이드 라인 추가 (위치, 라인)

const PageGuide: React.FC = ({ children }) => {
    const setPageGuide = useSetRecoilState(pageGuideState);
  
    const closeGuide = () => {
      setPageGuide('');
    };
  
    return (
      <PageGuideContainer>
        <PageGuideBackground />
        <GuideContent>{children}</GuideContent>
      </PageGuideContainer>
    );
  };
  
  export default PageGuide;