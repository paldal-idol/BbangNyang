import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import StartPage from './pages/StartPage';
import WaitingRoomPage from './pages/WaitingRoomPage';
import BoardGamePage from './pages/BoardGamePage';
import NotFoundPage from './pages/NotFoundPage';
import WindowSizeErrorPage from './pages/WindowSizeErrorPage';

const App: React.FC = () => {
  const [windowSize, setWindowSize] = useState(window.innerWidth);

  const handleResize = () => {
    setWindowSize(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      {windowSize < 800 && <WindowSizeErrorPage />}
      <BrowserRouter>
        <Switch>
          <Route path="/waiting" component={WaitingRoomPage} />
          <Route path="/game" component={BoardGamePage} />
          <Route exact path="/" component={StartPage} />
          <Route path="/*" component={NotFoundPage} />
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default App;
