const path = require("path");
const webpack = require('webpack');

module.exports = {
  entry: {
    main: "./src/main.js",
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: ["html-loader"]
      },
      {
        test: /\.(svg|png|jpg|gif)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[hash].[ext]",
            outputPath: "imgs"
          }
        }
      },
      {
        test: /\.(woff(2)?|ttf|svg)$/,
        use: [{
        loader: 'file-loader',
        options: {
          name: "[name].[hash].[ext]",
          outputPath: "fonts"
        }
        }]
        }
    ]
  }
};