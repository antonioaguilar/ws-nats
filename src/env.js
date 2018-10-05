module.exports = {
  isNode: function() {
    return new Function('try { return this === global; } catch(e) { return false; }');
  }
};
