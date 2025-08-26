const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const connectDB = require('./db');
const Message = require('./models/Message');

const authRoutes = require('./routes/auth');
const usersRoutes = require('./routes/users');
const messagesRoutes = require('./routes/messages');
const groupsRoutes = require('./routes/groups');
const storiesRoutes = require('./routes/stories');

const app = express();
const server = http.createServer(app);

const corsOptions = {
  origin: [
    'http://localhost:5173',
    'https://chat.gi1superverse.com',
    'https://chat-api.gi1superverse.com',
    'https://api.gi1superverse.com'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
};

app.use(cors(corsOptions));

const io = new Server(server, {
  cors: corsOptions
});

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/messages', messagesRoutes);
app.use('/api/groups', groupsRoutes);
app.use('/api/stories', storiesRoutes);

let users = {};

// Socket.IO
io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('addUser', (userId) => {
    users[userId] = socket.id;
    io.emit('getUsers', users);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
    users = Object.fromEntries(Object.entries(users).filter(([_, value]) => value !== socket.id));
    io.emit('getUsers', users);
  });

  socket.on('join group', (groupId) => {
    socket.join(groupId);
  });

  socket.on('private message', async ({ to, from, message, createdAt }) => {
    const toSocketId = users[to];

    const newMessage = new Message({
      to,
      from,
      message
    });

    await newMessage.save();

    if (toSocketId) {
      io.to(toSocketId).emit('private message', { to, from, message, createdAt });
    }
  });

  socket.on('group message', async ({ to, from, message, createdAt }) => {
    const newMessage = new Message({
      to,
      from,
      message,
      group: to,
    });

    await newMessage.save();

    io.to(to).emit('group message', { to, from, message, createdAt });
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
