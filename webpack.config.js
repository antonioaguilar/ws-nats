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
    path: __dirname + '/dist'
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

  plugins: []

};

var nodejsConfig = {

  entry: {
    NATS: __dirname + '/src/nats.js'
  },

  target: 'node',

  output: {
    filename: 'ws-nats.cjs.js',
    library: 'NATS',
    libraryTarget: 'commonjs',
    path: __dirname + '/dist'
  },

  plugins: []

};

module.exports = [nodejsConfig, browserConfig];
