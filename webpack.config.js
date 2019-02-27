const path = require('path');
/* const ASSET_PATH = '/assets';
const ExtractTextPlugin = require('extract-text-webpack-plugin');
 */
/* __webpack_public_path__ = '/assets'; */

module.exports = {
  entry: path.resolve(__dirname, 'app/js'),
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: './'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }/*,
      { 
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
          }
        ]
      } */
    ]
  },
  /* plugins: [
    new ExtractTextPlugin('build/index.css'),
    new webpack.DefinePlugin({
      'process.env.ASSET_PATH': JSON.stringify(ASSET_PATH)
    })
  ], */
  devServer: {
    port: 9000,
    contentBase: path.resolve(__dirname, 'build')
  }/* ,
  plugins: [
    // This makes it possible for us to safely use env vars on our code
    new webpack.DefinePlugin({
      'process.env.ASSET_PATH': JSON.stringify(ASSET_PATH)
    })
  ] */
}


