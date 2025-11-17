import express from 'express';
import chatHistory from '../Controllers/chatHistoryController.js';
import { authMiddleWare } from '../Controllers/authController.js';

const chatHistoryRoute = express.Router();

chatHistoryRoute.get('/chathistory/:user1/:user2', authMiddleWare, chatHistory);

export default chatHistoryRoute;