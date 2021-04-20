const nodeExternals = require("webpack-node-externals");
const NodemonPlugin = require("nodemon-webpack-plugin");

module.exports = [{
  mode: "development",
  entry: {
    client: "./src/client/index.ts",
  },
  output: {
    filename: "[name].js",
    path: `${__dirname}/public/js`,
  },
  module: {
    rules: [{
      test: /\.ts$/,
      use: "ts-loader",
      exclude: /node_modules/,
    }]
  },
  resolve: {
    extensions: [".ts", ".js"]
  },
},
{
  mode: "development",
  entry: {
    server: "./src/server/index.ts",
  },
  target: "node",
  node: {
    __dirname: false,
    __filename: false,
  },
  externals: [nodeExternals()],
  module: {
    rules: [{
      test: /\.ts$/,
      use: "ts-loader",
      exclude: /node_modules/,
    }]
  },
  plugins: [
    new NodemonPlugin(),
  ],
  resolve: {
    extensions: [".ts", ".js"]
  },
}];
