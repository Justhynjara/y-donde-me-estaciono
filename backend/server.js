require('dotenv').config();
const http = require('http');
const app = require('./src/app');
const { Server } = require('socket.io');

const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*" }
});

require('./src/sockets/socket')(io);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log("Servidor corriendo en puerto " + PORT);
});
