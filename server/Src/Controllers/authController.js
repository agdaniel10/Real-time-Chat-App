import User from "../Models/userModel.js";
import catchAsync from "../Utils/catchAsync.js";
import AppError from "../Utils/appError.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const createWebToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JSON_WEB_TOKEN_FOR_CHAT_SECRET, {
        expiresIn: process.env.JSON_WEB_TOKEN_FOR_CHAT_EXPIRE || '5d'
    });
};

// Register User
const registerUser = catchAsync(async (req, res, next) => {
    const { userName, email, password } = req.body;

    if (!userName) return next(new AppError('Kindly provide username', 400));

    if (!email) return next(new AppError('Kindly provide your email', 400));

    if (!password || password.length < 6)
        return next(new AppError('Password must be at least 6 characters', 400));

    const userNameExist = await User.findOne({ userName });
    if (userNameExist) return next(new AppError('Username already taken', 409));

    const emailExist = await User.findOne({ email });
    if (emailExist) return next(new AppError('Email already exists', 409));

    const user = await User.create({ userName, email, password });
    const token = createWebToken(user._id);

    res.status(201).json({
        status: 'success',
        message: 'User registered successfully',
        data: { user, token }
    });
});

// User login
const loginUser = catchAsync(async (req, res, next) => {
    const { userName, password } = req.body;

    if (!userName || !password) {
        return next(new AppError('Provide login credentials', 400));
    }

    const user = await User.findOne({ userName }).select("+password");
    if (!user) {
        return next(new AppError("Invalid credentials", 400));
    }

    const correctPassword = await bcrypt.compare(password, user.password);
    if (!correctPassword) {
        return next(new AppError("Invalid credentials", 400));
    }

    const token = createWebToken(user._id);
    user.password = undefined;

    res.status(200).json({
        status: 'success',
        message: 'User logged in successfully',
        data: { user, token }
    });
});



const authMiddleWare = catchAsync(async (req, res, next) => {
    let token;

    // Extract token from Authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    }
    else if (req.cookies?.jwt) {
        token = req.cookies.jwt;
    }

    if (!token) {
        return next(new AppError('Please login to access this resource', 401));
    }

    const decoded = jwt.verify(token, process.env.JSON_WEB_TOKEN_FOR_CHAT_SECRET);

    const user = await User.findById(decoded.id).select("+passwordChangedAt");
    if (!user) {
        return next(new AppError('User no longer exists', 401));
    }
    user.password = undefined;

    req.user = user;
    next();
});



const getMe = catchAsync (async (req, res, next) => {

    res.status(200).json({
        status: 'succes',
        data: {
            user: req.user
        }
    })
})

export {registerUser, loginUser, getMe, authMiddleWare}