var browserConfig = {

  entry: {
    NATS: __dirname + '/lib/nats.js'
  },

  target: 'web',

  output: {
    filename: 'ws-nats.umd.js',
    library: 'NATS',
    libraryTarget: 'umd',
    path: __dirname + '/dist'
  },

  plugins: []

};

var nodejsConfig = {

  entry: {
    NATS: __dirname + '/lib/nats.js'
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
