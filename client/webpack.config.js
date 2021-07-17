const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',

  entry: './src/index',

  resolve: {
    modules: [path.join(__dirname, 'src'), 'node_modules'],
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.css', '.scss', '.json'],
    alias: {
      '@atoms': path.resolve(__dirname, 'src/components/atoms/'),
      '@molecules': path.resolve(__dirname, 'src/components/molecules'),
      '@organisms': path.resolve(__dirname, 'src/components/organisms/'),
      '@pages': path.resolve(__dirname, 'src/pages/'),
      '@utils': path.resolve(__dirname, 'src/utils/'),
      '@theme': path.resolve(__dirname, 'src/theme/'),
      '@img': path.resolve(__dirname, 'src/assets/img/'),
      '@store': path.resolve(__dirname, 'src/store/'),
    },
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.PNG$/i,
        loader: 'file-loader',
      },
      {
        test: /\.css$/,
        loader: 'css-loader',
      },
    ],
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },

  plugins: [
    new HtmlWebpackPlugin({
      // index.html에 output에서 만들어진 bundle.js를 적용하여, dist에 새로운 html 파일 생성
      template: `./public/index.html`,
      favicon: './public/favicon.ico',
    }),
  ],

  devServer: {
    port: 3000,
    historyApiFallback: true,
  },
};
