import express from 'express'
import cors from 'cors'
import http from 'http'
import { Server } from 'socket.io'
import connectDB from './Config/database.js'
import dotenv from "dotenv";
import authRouter from './Routes/authRoutes.js';
import userRouter from './Routes/userRoutes.js'
import { saveMessage } from './Controllers/messageController.js'
import chatHistoryRoute from './Routes/chatHistoryRoutes.js'

dotenv.config();

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());

// Connect DB
connectDB();

// Create HTTP server
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ["GET", "POST"]
  }
});

// SOCKET.IO LOGIC
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Register user to a unique room
  socket.on('register', (userId) => {
    socket.join(userId);
    console.log(`User ${userId} joined their room`);
  });

  // Handle sending message
    socket.on('send_message', async (data) => {
        const { sender, receiver, text } = data;
        console.log('Saving message:', data);

        try {
            // Save message into DB
            const savedMessage = await saveMessage({ sender, receiver, text });
            console.log('Message saved:', savedMessage);

            if (savedMessage) {
                // Emit to receiver's room
                console.log('Emitting to receiver:', receiver);
                io.to(receiver).emit('receive_message', savedMessage);

                io.to(sender).emit('message_sent', savedMessage);
            } else {
                console.error('Failed to save message');
            }
        } catch (error) {
            console.error('Error in send_message:', error);
            socket.emit('message_error', { error: 'Failed to send message' });
        }
    });

  // Disconnect
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// REST API Routes
app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/chat', chatHistoryRoute)

server.listen(3000, () => {
  console.log('Server running on port 3000');
});
