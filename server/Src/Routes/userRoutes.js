import express from 'express';
import { searchUser } from '../Controllers/userController.js';

const userRouter = express.Router();

userRouter.get('/searchUserName', searchUser);

export default userRouter;
