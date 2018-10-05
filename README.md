# ws-nats
[![npm](https://img.shields.io/npm/v/ws-nats.svg)](https://www.npmjs.com/package/ws-nats)
[![License MIT](https://img.shields.io/npm/l/ws-nats.svg)](http://opensource.org/licenses/MIT)

A browser and NodeJS websocket client library for NATS

### Install

```bash
npm install --save ws-nats
```

### Usage

Browser:

```html
<!DOCTYPE html>
<html lang="en">
<head></head>
<body>
  <script src="ws-nats.umd.js"></script>
  <script>
    var NATS = window.NATS;
    
    var nats = NATS.connect({ url: 'ws://0.0.0.0:8080', json: true });
    
    nats.publish('foo', { message: 'Hello World!' });
  </script>
</body>
</html>
```

NodeJS:
```javascript
var NATS = require('ws-nats');

var nats = NATS.connect({ url: 'ws://0.0.0.0:8080', json: true });

nats.publish('foo', { message: 'Hello World!' });
``` 

### Basic Example

```javascript
var NATS = require('ws-nats');

var nats = NATS.connect({ url: 'ws://0.0.0.0:8080', json: true });

// Simple Publisher
nats.publish('foo', { message: 'Hello World!' });

// Simple Subscriber
nats.subscribe('foo', function(msg) {
  console.log('Received a message: ' + msg);
});

// "*" matches any token, at any level of the subject.
nats.subscribe('foo.*.baz', function(msg, reply, subject) {
  console.log('Msg received on [' + subject + '] : ' + msg);
});

nats.subscribe('foo.bar.*', function(msg, reply, subject) {
  console.log('Msg received on [' + subject + '] : ' + msg);
});

// Using Wildcard Subscriptions

// ">" matches any length of the tail of a subject, and can only be
// the last token E.g. 'foo.>' will match 'foo.bar', 'foo.bar.baz',
// 'foo.foo.bar.bax.22'
nats.subscribe('foo.>', function(msg, reply, subject) {
  console.log('Msg received on [' + subject + '] : ' + msg);
});


// Unsubscribing
var sid = nats.subscribe('foo', function(msg) {});
nats.unsubscribe(sid);

// Request Streams
var sid = nats.request('request', function(response) {
  console.log('Got a response in msg stream: ' + response);
});

// Request with Auto-Unsubscribe. Will unsubscribe after
// the first response is received via {'max':1}
nats.request('help', {}, {'max':1}, function(response) {
  console.log('Got a response for help: ' + response);
});

// Request for single response with timeout.
nats.requestOne('help', {}, {}, 1000, function(response) {
  // `NATS` is the library.
  if(response instanceof NATS.NatsError && response.code === NATS.REQ_TIMEOUT) {
    console.log('Request for help timed out.');
    return;
  }
  console.log('Got a response for help: ' + response);
});

// Replies
nats.subscribe('help', function(request, replyTo) {
  nats.publish(replyTo, 'I can help!');
});
```

> This library is compatible with all the API methods in [node-nats](https://github.com/nats-io/node-nats#basic-usage)

### Testing

To test `ws-nats`, you need to connect to a [NATS server](https://github.com/nats-io/gnatsd) using a Websocket-to-TCP relay such as [nats-relay](https://hub.docker.com/r/aaguilar/nats-relay/) or [ws-tcp-relay](https://github.com/isobit/ws-tcp-relay).

You can use Docker to run the `gnatsd` server and the Websockets to TCP relay:

```
# launch the gnatsd server
docker run -it --name=nats --rm -d -p 4222:4222 -p 8222:8222 nats -D -m 8222

# launch the relay (assumes we are using Linux!)
docker run -it --name=relay --rm -d -p 8080:8080 aaguilar/nats-relay -p 8080 $(hostname -i):4222

# then configure ws-nats to connect to the relay
var nats = NATS.connect({ url: 'ws://0.0.0.0:8080', json: true });
```

### Browser support

Tested in the following browsers versions:

* Google Chrome 53+
* Firefox 37+
* Internet Explorer 11
* Microsoft Edge 12+
* Safari 9+
* Mobile Safari 11+
* Opera 46+

### Limitations
* Internet Explorer 9/10 are not supported because it doesn't support the [Crypto API](https://caniuse.com/#feat=getrandomvalues)
* The UMD bundle produced by Webpack is quite large at the moment (e.g. ~ 338 KiB), please consider this when including the library in your project


### Acknowledgements

This library is heavily inspired by [websocket-nats](https://github.com/isobit/websocket-nats) and re-uses the sames API methods from the original [node-nats](https://github.com/nats-io/node-nats#basic-usage) library. 
The only difference is that `ws-nats` can run in both the browser and NodeJS (via a W3C compliant WebSocket library). 
