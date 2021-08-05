import React from 'react';
import PageGuide from "@atoms/PageGuide";
import GuideContent from "@atoms/GuideContent";
import { useSetRecoilState } from 'recoil';
import pageGuideState from '@store/pageGuide';


const StartPageGuide: React.FC = () => {
    const setPageGuide = useSetRecoilState(pageGuideState);


    const closePageGuide = () => {
        setPageGuide('');
    };

    return (
        <PageGuide>
            {/* <GuideContent x좌표=? y좌표=? 내용=""/> */}
            <GuideContent />
            <GuideContent />
            <GuideContent />
            <GuideContent />
        </PageGuide>
    )
}


export default StartPageGuide;