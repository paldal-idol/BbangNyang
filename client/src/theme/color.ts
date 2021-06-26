interface Color {
  [key: string]: string;
}

interface Colors {
  [key: string]: Color;
}

const color: Colors = {
  primary: {},
  bakery: {
    doorBack: '#DDA660',
  },
  background: {
    main: '#f6f6d3',
    translucentBlack: '#00000050',
  },
  button: {
    yellow: '#f9f4c6',
    lightYellow: '#f5efba',
    gray: '#d3d3d3',
    lightGray: '#d8d8d8',
  },
};

export default color;
