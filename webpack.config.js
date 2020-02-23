const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');

const ENTRY = './src/index.tsx';
const OUTPUT_DIR = 'dist';
const OUTPUT_FILENAME = 'bundle.js';
const LIBRARY_NAME = 'CalendarPlus';

module.exports = {
  entry: ENTRY,
  output: {
    library: LIBRARY_NAME,
    path: path.resolve(__dirname, OUTPUT_DIR),
    filename: OUTPUT_FILENAME,
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: 'ts-loader',
      },
    ],
  },
  resolve: {
    alias: {
      '@src': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@core': path.resolve(__dirname, './src/core'),
    },
    extensions: ['.js', '.json', '.tsx', '.ts'],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './tests/index.html',
      filename: 'index.html',
    }),
  ],
  devServer: {
    allowedHosts: ['127.0.0.1'],
    contentBase: [path.join(__dirname, 'dist')],
    compress: true,
    open: true,
    port: 1717,
  },
};
