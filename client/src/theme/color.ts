interface Color {
  [key: string]: string;
}

interface Colors {
  [key: string]: Color;
}

const color: Colors = {
  primary: {
    darkYellow: '#FDBE1F',
    lightBrown: '#DCA660',
    gray: '#d3d3d3',
    black: '#4a4a4a',
    blue: '#64b2ff',
  },
  bakery: {
    doorBack: '#DDA660',
  },
  background: {
    main: '#f6f6d3',
    translucentBlack: '#00000050',
  },
  button: {
    darkYellow: '#FDBE1F',
    yellow: '#f9f4c6',
    lightYellow: '#f5efba',
    orange: '#FF8E1D',
    darkGray: '#666666',
    gray: '#d3d3d3',
    lightGray: '#d8d8d8',
  },
};

export default color;
