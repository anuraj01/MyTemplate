const path = require("path");
const common = require("./webpack.common");
const merge = require("webpack-merge");
var HtmlWebpackPlugin = require("html-webpack-plugin");
const {InjectManifest} = require('workbox-webpack-plugin');

module.exports = merge(common, {
  mode: "development",
  devtool: 'inline-source-map',
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html"
    }),
    new InjectManifest({
      swSrc: './profile-worker.js',
      swDest: './profile-worker.js',
      // Any other config if needed.
    }),
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          "css-loader", 
          "sass-loader" 
        ]
      }
    ]
  }
});