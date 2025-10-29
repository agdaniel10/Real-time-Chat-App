import express from 'express'
import { searchUser } from '../Controllers/userController'
import { authMiddleWare } from '../Controllers/authController'

const userRouter = express.Router()

userRouter.post('/searchUserName',authMiddleWare, searchUser)

export default userRouter;