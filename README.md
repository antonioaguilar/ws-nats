# ws-nats
A browser and NodeJS websocket client library for NATS

### Install

```bash
npm install --save ws-nats
```

### Usage

```javascript
var nats = NATS.connect({ url: 'ws://0.0.0.0:8080', json: true });

nats.subscribe('events.*', function(event) {
  console.log(event);
});

nats.publish('events.123', { message: 'Hola' });
```

> This library is compatible with all the API methods in [node-nats](https://github.com/nats-io/node-nats#basic-usage)

### Testing

To test `ws-nats`, you need to connect to a [NATS server](https://github.com/nats-io/gnatsd) using a Websocket-to-TCP relay such as [nats-relay](https://hub.docker.com/r/aaguilar/nats-relay/) or [ws-tcp-relay](https://github.com/isobit/ws-tcp-relay).

You can use Docker to run the `gnatsd` server and the `Websockets-to-TCP` relay:

```
# launch the gnatsd server
docker run -it --name=nats --rm -d -p 4222:4222 -p 8222:8222 nats -D -m 8222

# launch the relay
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
