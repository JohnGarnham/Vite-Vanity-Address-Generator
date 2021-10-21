const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
    module: {
      rules: [
        {
          test: /\.worker\.js$/,
          use: { loader: "worker-loader" },
        },
      ],
    },
  };