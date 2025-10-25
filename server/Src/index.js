import express from 'express'
import cors from 'cors'
import connectDB from './Config/database.js'
import dotenv from "dotenv";
dotenv.config();


const app = express()

app.use(cors())
app.use(express.json())

connectDB()

app.listen(3000, () => {
    console.log('Sever running on port 3000')
})

