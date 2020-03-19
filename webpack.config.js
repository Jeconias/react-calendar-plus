const path = require('path');

const ENTRY = './src/index.tsx';
const OUTPUT_DIR = 'dist';
const OUTPUT_FILENAME = 'bundle.js';
const LIBRARY_NAME = 'CalendarPlus';

const baseConfig = {
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
      '@public': path.resolve(__dirname, './public'),
      react: path.resolve('./node_modules/react'),
    },
    extensions: ['.js', '.json', '.tsx', '.ts'],
  },
  devServer: {
    allowedHosts: ['127.0.0.1'],
    contentBase: [path.join(__dirname, 'dist')],
    compress: true,
    open: true,
    port: 1717,
  },
};

module.exports = (env) => {
  const isProd = env && env.production;

  if (isProd)
    return {
      ...baseConfig,
      externals: {
        react: 'react',
        'react-dom': 'react-dom',
      },
    };

  return baseConfig;
};
