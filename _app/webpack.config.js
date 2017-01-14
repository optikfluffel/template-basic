var path = require('path')
var webpack = require('webpack')
var merge = require('webpack-merge')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var CopyWebpackPlugin = require('copy-webpack-plugin')

// detemine build env
var TARGET_ENV = process.env.NODE_ENV

// common webpack config
var common = {
  output: {
    path: path.resolve(__dirname, 'build/'),
    filename: '[hash].js'
  },
  resolve: {
    extensions: ['.js', '.json']
  },
  module: {
    loaders: [
      { test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2040']
        }
      },
      {
        test: /\.(eot|ttf|woff|woff2|svg)$/,
        loader: 'file-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      inject: 'body',
      filename: 'index.html'
    })
  ]
}

// additional webpack settings for local env (when invoked by 'npm start')
var development = {
  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    path.join(__dirname, 'src/client.js')
  ],
  devServer: {
    inline: true
  }
}

var production = {
  entry: [
    path.join(__dirname, 'src/client.js')
  ],
  plugins: [
    new CopyWebpackPlugin([
      { from: 'src/assets/', to: 'assets/' },
      { from: 'src/favicon.ico' }
    ]),
    // minify & mangle JS/CSS
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compressor: { warnings: false }
      // mangle:  true
    })
  ]
}

if (TARGET_ENV === 'development') {
  console.log('Booting webpack development server...')
  module.exports = merge(common, development)
} else if (TARGET_ENV === 'production') {
  console.log('Building production /build folder...')
  module.exports = merge(common, production)
}
