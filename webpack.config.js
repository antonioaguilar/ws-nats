var webpack = require('webpack');
var UglifyJSPlugin = require('uglifyjs-webpack-plugin');

var browserConfig = {

  entry: {
    NATS: __dirname + '/src/nats.js'
  },

  target: 'web',

  output: {
    filename: 'ws-nats.umd.js',
    library: 'NATS',
    libraryTarget: 'umd',
    path: __dirname + '/dist',
    globalObject: 'this'
  },

  optimization: {
    minimizer: [
      new UglifyJSPlugin({
        sourceMap: true,
        uglifyOptions: {
          output: { comments: false },
          compress: {
            inline: false
          }
        }
      })
    ]
  },

  devtool: false,

  plugins: [
    // new webpack.HotModuleReplacementPlugin()
    new webpack.SourceMapDevToolPlugin({})
  ]

};

var nodejsConfig = {

  entry: {
    NATS: __dirname + '/src/nats.js'
  },

  target: 'node',

  output: {
    filename: 'ws-nats.cjs.js',
    libraryTarget: 'commonjs',
    path: __dirname + '/dist'
  },

  plugins: []

};

// module.exports = [nodejsConfig, browserConfig];
module.exports = [browserConfig];
