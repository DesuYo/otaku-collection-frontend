const { join } = require('path')
const HTMLPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './index.js',
  output: {
    path: join(__dirname + 'built'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  plugins: [
    new HTMLPlugin({ template: './index.html' })
  ]
}