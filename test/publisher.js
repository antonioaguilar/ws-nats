var NATS = require('../dist/ws-nats.cjs').NATS;

var nats = NATS.connect({ url: 'ws://0.0.0.0:8080', json: true, name: 'ws-nats:nodejs' });

console.log('NATS library version:', NATS.version);

function random (min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }

var count = 0, MAX_MESSAGES = 10000;

var timer = setInterval(function() {

  if (count < MAX_MESSAGES) {
    var id = Date.now();
    var payload = {
      id: id,
      count: count,
      cpu: random(10, 100),
      timestamp: new Date().toISOString()
    };
    nats.publish('events.' + id, payload);
    console.log(count, JSON.stringify(payload, null, 0));
    count++;
  }
  else {
    clearInterval(timer);
    process.exit();
  }

}, 250);

nats.subscribe('HELLO', function(request, replyTo) {
  console.log('REQUEST:', JSON.stringify(request));
  nats.publish(replyTo, {
    request_payload: request,
    request_timestamp: new Date().toISOString(),
    request_id: replyTo
  });
});
