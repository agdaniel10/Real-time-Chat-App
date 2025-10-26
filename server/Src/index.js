import express from 'express'
import cors from 'cors'
import http from 'http'
import { Server } from 'socket.io'
import connectDB from './Config/database.js'
import dotenv from "dotenv";
import authRouter from './Routes/authRoutes.js';
dotenv.config();


const app = express()

app.use(cors())
app.use(express.json())

// Connect DB
connectDB()

// Create http server
const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ["GET", "POST"]
    }
})

// Socket Logic
io.on('connection', (socket) => {
    console.log('User connected:', socket.id)

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id)
    })
})

// Routes
app.use('/api/auth', authRouter)


server.listen(3000, () => {
    console.log('Server running on port 3000')
})
