import { createGlobalStyle } from 'styled-components';
import color from '@theme/color';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'NeoDunggeunmo';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.3/NeoDunggeunmo.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }

  html, body {
    margin: 0px;
    padding: 0px;
    width: 100%;
    height: 100%;
    font-family: 'NeoDunggeunmo';
    background-color: ${color.background.main};
    *:focus { outline:none; }
  }

  p{
    margin: 0px;
    font-family: 'NeoDunggeunmo';
    word-break: keep-all;
  }

  button{
    font-family: 'NeoDunggeunmo';
  }
`;

export default GlobalStyle;
