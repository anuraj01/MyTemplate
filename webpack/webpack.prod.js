const path = require("path");
const common = require("./webpack.common");
const merge = require("webpack-merge");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const {InjectManifest} = require('workbox-webpack-plugin');

const __root = path.resolve(__dirname, '../');

module.exports = merge(common, {
  mode: "production",
  output: {
    filename: "[name].[contentHash].bundle.js",
    path: path.resolve(__root, "public")
  },
  optimization: {
    minimizer: [
      new OptimizeCssAssetsPlugin(),
      new TerserPlugin(),
      new HtmlWebpackPlugin({
        template: "./index.html",
        minify: {
          removeAttributeQuotes: true,
          collapseWhitespace: true,
          removeComments: true
        }
      })
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({ 
        filename: "[name].[contentHash].css" 
    }),
    new CleanWebpackPlugin({
        cleanAfterEveryBuildPatterns: ['public']
    }),
    new CopyWebpackPlugin([
			{
        from: path.resolve(__root, 'assets/images/static'),
        to: path.resolve(__root, 'public/assets/images/static/'),
			},
        {
          from: path.resolve(__root, 'manifest.json'),
          to: path.resolve(__root, 'public/manifest.json'),
        }
		]),
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
          MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader"
        ]
      }
    ]
  }
});