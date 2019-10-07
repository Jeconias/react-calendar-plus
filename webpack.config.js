const path = require("path");

const base = {
  entry: "./src/CalendarJS.js",
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      }
    ]
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
