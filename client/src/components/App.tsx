import * as React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  background: black;
  color: white;
`;

const App: React.FC = () => {
  return <Button>hello world!</Button>;
};

export default App;
