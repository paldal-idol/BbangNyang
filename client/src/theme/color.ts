interface Color {
  [key: string]: string;
}

interface Colors {
  [key: string]: Color;
}

const myColor: Colors = {
  primary: {},
  background: {
    main: '#f6f6d3',
    translucentBlack: '#00000050',
  },
};

export default myColor;
