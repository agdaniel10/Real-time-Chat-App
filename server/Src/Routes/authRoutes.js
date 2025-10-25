import express from 'express';
import { registerUser } from '../Controllers/authController.js';

const authRouter = express.Router();

authRouter.post('/api/register', registerUser)

export default authRouter;