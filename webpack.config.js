    
const path = require('path');
const fs = require('fs');
const PATHS = {
  src: path.join(__dirname, 'src'),
  dist: path.join(__dirname, 'docs'),
  assets: 'assets/'
};
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PAGES_DIR = `${PATHS.src}/pug/pages/`;
const PAGES = fs.readdirSync(PAGES_DIR).filter(fileName => fileName.endsWith('.pug'));
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
  mode: 'development',
  entry: [
    './src/js/common.js',
    './src/scss/main.scss',
  ],
  devServer: {
    contentBase: './docs/',
    writeToDisk: true,
  },
  output: {
    filename: '../docs/index.js'
  },
  devtool: "source-map",
  plugins: [
    new MiniCssExtractPlugin({
      filename: '../docs/[name].css',
    }),
    ...PAGES.map(page => new HtmlWebpackPlugin({
      template: `${PAGES_DIR}/${page}`,
      filename: `../docs/${page.replace(/\.pug/,'.html')}`
    }))
  ],
  module: {
    rules: [
      {//обработчик css
        test: /\.css$/,
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { sourceMap: true }
          }, {
            loader: 'postcss-loader',
            options: { sourceMap: true, config: { path: 'src/js/postcss.config.js' } }
          }
        ]
      },
      {//обработчик scss
        test: /\.scss$/,
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { sourceMap: true }
          }, {
            loader: 'postcss-loader',
            options: { sourceMap: true, config: { path: 'src/js/postcss.config.js' } }
          }, {
            loader: 'sass-loader',
            options: { sourceMap: true }
          }
        ]
    },
    {//обработчик pug
      test: /\.pug$/,
      loader: 'pug-loader'
    },
    ],
  },
};