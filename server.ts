// custom server code from nextjs docs https://nextjs.org/docs/pages/building-your-application/configuring/custom-server
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const { Server } = require('socket.io');

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

// TODO setup proper typescript typing
app.prepare().then(() => {
  const server = createServer(async (req, res) => {
    try {
      // Be sure to pass `true` as the second argument to `url.parse`.
      // This tells it to parse the query portion of the URL.
      const parsedUrl = parse(req.url, true);
      const { pathname, query } = parsedUrl;

      if (pathname === '/a') {
        await app.render(req, res, '/a', query);
      } else if (pathname === '/b') {
        await app.render(req, res, '/b', query);
      } else {
        await handle(req, res, parsedUrl);
      }
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('internal server error');
    }
  });

  const io = new Server(server, {
    path: '/socket.io' // or any other path you need
  });

  // TODO setup rooms
  io.on('connection', socket => {
    // your sockets here
    console.log('IO_CONNECTION', socket.id);
    const roomName = socket.handshake.headers.referer.split('/').at(-1);
    console.log('IO_REFERER', roomName);
    socket.join(roomName);
    socket.on('createdMessage', (msg) => {
      console.log('new message received: ', roomName);
      socket.to(roomName).emit('messageReceived', msg);
    });
  });

  server.once('error', (err) => {
    console.error(err);
    process.exit(1);
  })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});
