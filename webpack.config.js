var browserConfig = {

  entry: {
    NATS: __dirname + '/src/nats.js'
  },

  target: 'web',

  output: {
    filename: 'ws-nats.js',
    library: 'NATS',
    libraryTarget: 'umd',
    path: __dirname + '/dist',
    globalObject: 'this'
  },

  plugins: []

};

module.exports = [browserConfig];
