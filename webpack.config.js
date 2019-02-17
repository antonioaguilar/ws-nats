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

  plugins: []

};

module.exports = [browserConfig];
