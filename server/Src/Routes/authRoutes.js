import express from 'express';
import { authMiddleWare, getMe, loginUser, registerUser } from '../Controllers/authController.js';

const authRouter = express.Router();

authRouter.post('/register', registerUser);
authRouter.post('/login', loginUser);

// Protect route
authRouter.get('/getMe', authMiddleWare, getMe)

export default authRouter;