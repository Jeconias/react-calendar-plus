const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");

const ENTRY = "./src/index.js";
const OUTPUT_DIR = "dist";
const OUTPUT_FILENAME = "bundle.js";
const LIBRARY_NAME = "CalendarPlus";

module.exports = {
  entry: ENTRY,
  output: {
    library: LIBRARY_NAME,
    path: path.resolve(__dirname, OUTPUT_DIR),
    filename: OUTPUT_FILENAME,
    libraryTarget: "umd"
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      }
    ]
  },
  resolve: {
    extensions: [".js", ".json"]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./tests/index.html",
      filename: "index.html"
    })
  ]
};
