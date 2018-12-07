const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  mode: 'development',
  context: __dirname,
  entry: './main.tsx',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'main.js'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader'
      }
    ]
  },
  resolve: {
    plugins: [
      new TsconfigPathsPlugin({
        configFile: path.resolve(__dirname, '../../tsconfig.json')
      })
    ],
    extensions: ['.ts', '.tsx', '.js', '.json']
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html'
    })
  ]
};
