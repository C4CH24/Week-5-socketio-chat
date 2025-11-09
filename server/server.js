import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
const server = createServer(app);

app.use(cors());
app.use(express.json());

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

// Store connected users
const users = new Map();
const typingUsers = new Set();

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Handle user joining
  socket.on('user_join', (username) => {
    users.set(socket.id, { username, id: socket.id });
    socket.broadcast.emit('user_joined', username);
    io.emit('users_online', Array.from(users.values()));
  });

  // Handle messages
  socket.on('send_message', (messageData) => {
    const user = users.get(socket.id);
    if (user) {
      const message = {
        id: Date.now().toString(),
        username: user.username,
        message: messageData.message,
        timestamp: new Date().toISOString()
      };
      io.emit('receive_message', message);
    }
  });

  // Handle typing indicators
  socket.on('typing_start', () => {
    const user = users.get(socket.id);
    if (user) {
      typingUsers.add(user.username);
      socket.broadcast.emit('typing_update', Array.from(typingUsers));
    }
  });

  socket.on('typing_stop', () => {
    const user = users.get(socket.id);
    if (user) {
      typingUsers.delete(user.username);
      socket.broadcast.emit('typing_update', Array.from(typingUsers));
    }
  });

  socket.on('disconnect', () => {
    const user = users.get(socket.id);
    if (user) {
      users.delete(socket.id);
      typingUsers.delete(user.username);
      socket.broadcast.emit('user_left', user.username);
      io.emit('users_online', Array.from(users.values()));
      io.emit('typing_update', Array.from(typingUsers));
    }
    console.log('User disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});