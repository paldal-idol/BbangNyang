import React, { useState, useEffect } from 'react';
import { RecoilRoot } from 'recoil';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import GlobalStyle from './global';
import StartPage from '@pages/StartPage';
import WaitingRoomPage from '@pages/WaitingRoomPage';
import BoardGamePage from '@pages/BoardGamePage';
import NotFoundPage from '@pages/NotFoundPage';
import ErrorPage from '@pages/ErrorPage';

const App: React.FC = () => {
  const [windowSize, setWindowSize] = useState(window.innerWidth);
  const [isValidBrowser, setIsValidBrowser] = useState(true);

  const handleResize = () => {
    setWindowSize(window.innerWidth);
  };

  const isBrowserChrome = () => {
    const agt = navigator.userAgent.toLowerCase();
    if (agt.indexOf('chrome') !== -1) {
      setIsValidBrowser(true);
      return;
    }
    setIsValidBrowser(false);
  };

  useEffect(() => {
    isBrowserChrome();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <React.StrictMode>
      <RecoilRoot>
        <GlobalStyle />
        {!isValidBrowser && <ErrorPage message={'Chrome 브라우저만 지원합니다😥'} />}
        {windowSize < 800 && <ErrorPage message={'화면 크기는 최소 800px 이상이어야 합니다😅'} />}
        <BrowserRouter>
          <Switch>
            <Route path="/waiting" component={WaitingRoomPage} />
            <Route path="/game" component={BoardGamePage} />
            <Route exact path="/" component={StartPage} />
            <Route path="/*" component={NotFoundPage} />
          </Switch>
        </BrowserRouter>
      </RecoilRoot>
    </React.StrictMode>
  );
};

export default App;
