const uuid = require('uuid/v4');

module.exports = {
  next: () => {
    return uuid().replace(/[-]/, '').substring(0, 8);
  }
};
