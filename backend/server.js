const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const socketio = require('socket.io');
const http = require('http');
const cors = require('cors'); // Add CORS middleware

dotenv.config();

const app = express();
const server = http.createServer(app);

// Add CORS configuration
const io = socketio(server, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:5173", // Match your frontend URL
    methods: ["GET", "POST"]
  }
});

// Connect to database
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000 // Fail faster if no connection
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1); // Exit process on connection failure
  });

// Middleware
app.use(express.json());
app.use(cors()); // Enable CORS for Express routes

// Add root route handler
app.get('/', (req, res) => {
  res.send('MSX API Server is running');
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);

// Store the io instance in the app
app.set('socketio', io);

// Socket.io connection
io.on('connection', (socket) => {
  console.log('New client connected');
  
  socket.on('join', (userId) => {
    socket.join(userId);
    console.log(`User ${userId} joined their room`);
  });
  
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
