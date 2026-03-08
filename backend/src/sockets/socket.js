module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('Cliente conectado');

    socket.on('disconnect', () => {
      console.log('Cliente desconectado');
    });
  });
};
