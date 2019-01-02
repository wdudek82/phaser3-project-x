const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

// // Phaser webpack config
// const phaserModule = path.join(__dirname, '/node_modules/phaser/');
// const phaser = path.join(phaserModule, 'src/phaser.js');

// --- Not finished ---
module.exports = {
  mode: 'development',
  entry: {
    main: path.resolve(__dirname, 'src/index.js'),
    // vendor: ['phaser'],
  },
  devServer: {
    contentBase: '.',
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: 'Project X - Phaser 3',
      // chunks: ['vendor', 'main'],
    }),
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      { test: /\.(png|svg|jpg|gif)$/, use: ['file-loader'] },
      { test: /\.(woff|woff2|eot|ttf|otf)$/, use: ['file-loader'] },
      { test: /\.(csv|tsv)$/, use: ['csv-loader'] },
      { test: /\.xml$/, use: ['xml-loader'] },
      // { test: /\.js$/, use: ['source-map-loader'], enforce: 'pre' },
    ],
  },
};
