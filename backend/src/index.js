const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const userRoutes = require('./routes/users');
const chatsRoutes = require('./routes/chats');
const chatRoutes = require('./routes/chat');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }
});

app.use(cors());
app.use(express.json());

app.use('/users', userRoutes);
app.use('/chats', chatsRoutes);
app.use('/chat', chatRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the Messaging App API');
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});