var util = require('util');
var SockJS = require('sockjs-client');
var EventEmitter = require('events').EventEmitter;

function WebSocketProxy(url) {
  var self = this;

  EventEmitter.call(this);

  this.sock = new SockJS(url, null, { transports: ['websocket'] });

  this.sock.onopen = function () {
    self.emit('connect');
  };

  this.sock.onmessage = function (e) {
    self.emit('data', Buffer.from(e.data, 'utf8'));
  };

  this.sock.onerror = function (e) {
    self.emit('error', e);
  };

  this.sock.onclose = function () {
    self.emit('close');
  };
}

util.inherits(WebSocketProxy, EventEmitter);

WebSocketProxy.prototype.end = function () {
  this.destroy();
};

WebSocketProxy.prototype.destroy = function () {
  if (this.sock.readyState === SockJS.CONNECTING || this.sock.readyState === SockJS.OPEN) {
    this.sock.close();
  }
};

WebSocketProxy.prototype.write = function (data) {
  if (this.sock.readyState === SockJS.OPEN) {
    this.sock.send(data);
  }
};

WebSocketProxy.prototype.pause = function () {
  console.warn('WebSocketProxy stream pause/resume is not supported yet.');
};

WebSocketProxy.prototype.resume = function () { };

// IMPORTANT: nats.js needs to be patched:
// replace: this.stream = net.createConnection(this.url.port, this.url.hostname);
// with: this.stream = net.createConnection(this.url);

exports.createConnection = function (url) {
  // The url is rebuilt to avoid including the auth credentials.
  var connection = new WebSocketProxy(url.format({
    protocol: url.protocol,
    slashes: url.slashes,
    host: url.host,
    hostname: url.hostname,
    port: url.port,
    pathname: url.pathname,
    search: url.search,
    path: url.path,
    query: url.query,
    hash: url.hash
  }));
  connection.setNoDelay = function () { };
  return connection;
};
