const http = require('http');
const {RECORDER_PORT, INSPECTOR_PORT} = require('./constants');

const logger = console;
let activity = [];
let server;
const sockets = new Set();

const handleRequest = (request, response) => {
  switch (request.url) {
    case '/ingest': {
      let stringBody = '';
      request.setEncoding('utf8');
      request.on('data', (chunk) => {
        stringBody += chunk;
      });
      request.on('end', () => {
        try {
          const body = JSON.parse(stringBody);

          activity = [...activity, ...body];

          response.writeHead(200, {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          });
          response.end();

          const req = http.request({
            port: INSPECTOR_PORT,
            host: '127.0.0.1',
            path: '/ingest',
            method: 'POST',
            headers: {'content-type': 'application/json'},
          });
          req.on('error', () => {});
          req.end(stringBody);
        } catch (error) {
          logger.error(error);
          response.writeHead(500, {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          });
          response.end(`{"status":"error", "error": "${error.message}"}\n`);
        }
      });
      break;
    }
    default:
      response.writeHead(404);
      response.end();
  }
};

const recordSandwormActivityAsync = (onError, done) => {
  if (server) {
    return;
  }

  server = http.createServer((request, response) => {
    handleRequest(request, response);
  });
  server.listen(RECORDER_PORT);
  server.on('error', (err) => {
    if (typeof onError === 'function') {
      onError(err);
    }
  });
  server.on('listening', () => {
    done();
  });
  server.on('connection', (socket) => {
    sockets.add(socket);

    server.once('close', () => {
      sockets.delete(socket);
    });
  });
};

const recordSandwormActivityPromise = (onError) =>
  new Promise((resolve) => {
    recordSandwormActivityAsync(onError, resolve);
  });

const recordSandwormActivity = (onError, done) => {
  if (done) {
    return recordSandwormActivityAsync(onError, done);
  }

  return recordSandwormActivityPromise(onError);
};

const stopRecordingSandwormActivityAsync = (done) => {
  if (!server) {
    return;
  }

  sockets.forEach((socket) => {
    socket.destroy();
    sockets.delete(socket);
  });
  server.close(() => {
    server = undefined;
    activity = [];
    done();
  });
};

const stopRecordingSandwormActivityPromise = () =>
  new Promise((resolve) => {
    stopRecordingSandwormActivityAsync(resolve);
  });

const stopRecordingSandwormActivity = (done) => {
  if (done) {
    return stopRecordingSandwormActivityAsync(done);
  }

  return stopRecordingSandwormActivityPromise();
};

const getRecordedActivity = () => activity;

module.exports = {
  recordSandwormActivity,
  stopRecordingSandwormActivity,
  getRecordedActivity,
};
