const webpackCommon = require("./webpack.common");

module.exports = {
  mode: "production",
  entry: webpackCommon.entry,
  output: webpackCommon.output,
  resolve: webpackCommon.resolve,
  module: {
    rules: [
      ...webpackCommon.module.rules,
      {
        test: /\.js$/,
        enforce: "pre",
        use: ["source-map-loader"],
      },
    ],
  },
  plugins: [...webpackCommon.plugins],
};
