var path = require('path')
var webpack = require('webpack')

var DIST = path.join(__dirname, 'dist')

module.exports = {
  entry: {
    index: './index.js'
  },
  output: {
    path: DIST,
    filename: 'd3-trial-bar.min.js'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }]
  },
  resolve: {
    extensions: ['', '.js']
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.AggressiveMergingPlugin()
  ]
}
