const path = require('path')

module.exports = {
  entry: {
    wrapped: './client/wrapped.js',
    raw: './client/raw.js'
  },
  output: {
    path: path.resolve(__dirname, 'public/javascripts'),
    filename: '[name].js'
  },
  module: {
    rules: [
      { test: /\.js/, exclude: /node_modules/, use: 'babel-loader' }
    ]
  },
  devtool: 'source-map'
}
