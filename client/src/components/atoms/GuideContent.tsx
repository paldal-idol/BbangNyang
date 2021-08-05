import React from 'react';
import styled from 'styled-components';
import color from '@theme/color';

const GuideContainer = styled.div`
    display: flex;
`;
const Line = styled.div`
    display: flex;
`;
const ContentContainer = styled.div`
    display: flex;
    background-color: ${color.primary.darkYellow};
`;

const Content = styled.div`
    display: flex;
`;



const GuideContent: React.FC = ({ children }) => {
    return (
        
        <GuideContainer>
            <Line>

            </Line>
            <ContentContainer>
                <Content>
                    
                </Content>
            </ContentContainer>
        </GuideContainer>
    );
  };



export default GuideContent;