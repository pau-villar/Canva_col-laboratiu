const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const port = 3006;

app.use(express.static('public'));

const users = {}; // { socket.id: { name, x, y } }

function randomColor() {
  const hue = Math.floor(Math.random() * 360);
  return `hsl(${hue}, 70%, 45%)`;
}

io.on('connection', (socket) => {
  console.log('Cliente conectado:', socket.id);

  socket.on('user:join', (name) => {
    if (typeof name !== 'string') return;
    name = name.trim();
    if (name.length === 0 || name.length > 20) return;

    users[socket.id] = { name, x: 0, y: 0, color: randomColor() };
  });

  socket.on('cursor:move', (pos) => {
    const user = users[socket.id];
    if (!user) return;
    if (!pos || typeof pos.x !== 'number' || typeof pos.y !== 'number') return;

    user.x = pos.x;
    user.y = pos.y;

    io.emit('cursors:update', users);
  });

  socket.on('disconnect', () => {
    console.log('Cliente desconectado:', socket.id);
    delete users[socket.id];
    io.emit('cursors:update', users);
  });
});

server.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});