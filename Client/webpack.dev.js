const webpackCommon = require("./webpack.common");

module.exports = {
  mode: "development",
  entry: webpackCommon.entry,
  output: webpackCommon.output,
  resolve: webpackCommon.resolve,
  module: {
    rules: [
      ...webpackCommon.module.rules,
      { test: /\.js$/, loader: "source-map-loader", enforce: "pre" },
    ],
  },
  plugins: [...webpackCommon.plugins],
  watch: true,
  watchOptions: {
    aggregateTimeout: 600,
    ignored: /node_modules/,
  },
};
