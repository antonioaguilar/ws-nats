var env = require('./env');

if (env.isNode()) {
  module.exports = require('crypto');
  //exports.randomBytes = require('crypto').randomBytes;
}
else {
  var crypto = window.crypto || window.msCrypto;

  exports.randomBytes = function(size, cb) {
    var buf = new Uint8Array(size);
    if (size > 0) {
      crypto.getRandomValues(buf);
    }
    return buf;
  };
}


