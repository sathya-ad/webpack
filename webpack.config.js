const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  entry: [
    './src/main/webapp/js/index.js',
    './src/main/webapp/styles/sass/main.scss'
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './src/main/webapp/dist')
  },
  watch: true,

  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          fix: true
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.(s*)css$/,
        exclude: /node_modules/,
        use: [
          { loader: 'style-loader', options: { sourceMap: true } },
          { loader: MiniCssExtractPlugin.loader },
          { loader: 'css-loader', options: { sourceMap: true } },
          { loader: 'resolve-url-loader', options: { sourceMap: true } },
          { loader: 'sass-loader', options: { sourceMap: true } }
        ]
      },
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        use: {
          loader: 'file-loader?name=fonts/[name].[ext]&publicPath=/dist/'
        }
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      allChunks: true
    })
  ]
};
