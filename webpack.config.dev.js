var path = require('path')

var EXAMPLE = path.join(__dirname, 'example')

module.exports = {
  entry: {
    example: path.join(EXAMPLE, 'index.js')
  },
  output: {
    path: EXAMPLE,
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }]
  },
  devtool: 'cheap-source-map',
  devServer: {
    contentBase: EXAMPLE,
    inline: true,
    progress: true,
    stats: { color: true },
    port: 3000
  },
  resolve: {
    extensions: ['', '.js']
  }
}
