const webpack = require("webpack");
const { inDev } = require("./webpack.helpers");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = [
  new ForkTsCheckerWebpackPlugin(),
  inDev() && new webpack.HotModuleReplacementPlugin(),
  inDev() && new ReactRefreshWebpackPlugin(),
  new webpack.DefinePlugin({
    "process.env": JSON.stringify(
      Object.fromEntries(
        [
          "NETWORK",
          "CHAIN_URI",
          "CHAIN_EXPLORER_URI",
          "CHAIN_NAME",
          "CHAIN_ID",
          "CHAIN_CURRENCY_NAME",
          "CHAIN_CURRENCY_SYMBOL",
          "CHAIN_CURRENCY_DECIMALS",
          "BLOCK_TIME",
          "CONTRACT_ADDRESS",
          "START_BLOCKHEIGHT",
          "BACKEND_URI",
          "WEBSERVER_PORT",
          "TOKTOK_NFT_FACTORY_CONTRACT_ADDRESS",
          "PAYMENT_TOKEN_CONTRACT_ADDRESS",
        ].map((key) => [key, process.env[key]]),
      ),
    ),
  }),
  new HtmlWebpackPlugin({
    template: "src/index.html",
    favicon: "assets/favicon/favicon.ico",
    inject: true,
  }),
  new MiniCssExtractPlugin({
    filename: "[name].[chunkhash].css",
    chunkFilename: "[name].[chunkhash].chunk.css",
  }),
  new CopyPlugin({
    patterns: [{ from: "assets/images/og-jp.png", to: "og-jp.png" }],
  }),
].filter(Boolean);
