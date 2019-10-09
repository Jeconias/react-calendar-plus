const path = require("path");

const base = {
  entry: "./src/index.ts",
  module: {
    rules: [
      {
        test: /\.(ts)$/,
        loader: "babel-loader"
      },
      {
        test: /\.js$/,
        use: ["source-map-loader"]
      }
    ]
  },
  resolve: {
    extensions: [".js", ".jsx", ".tsx", ".ts", ".json"]
  }
};

const prod = {
  ...base,
  mode: "production",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "calendarjs.min.js",
    library: ["CalendarJS"]
  }
};

const dev = {
  ...base,
  mode: "development",
  output: {
    path: path.resolve(__dirname, "dev"),
    filename: "calendarjs-dev.js",
    library: ["CalendarJS"]
  }
};

module.exports = (env, args) => {
  if (args.mode === "production") return prod;
  return dev;
};
