import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import StartPage from './pages/StartPage';
import WaitingRoomPage from './pages/WaitingRoomPage';
import BoardGamePage from './pages/BoardGamePage';
import NotFoundPage from './pages/NotFoundPage';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        {/* <Route path="/waiting" component={WaitingRoomPage} /> */}
        {/* <Route path="/game" component={BoardGamePage} /> */}
        <Route exact path="/" component={StartPage} />
        {/* <Route path="/*" component={NotFoundPage} /> */}
      </Switch>
    </BrowserRouter>
  );
};

export default App;
