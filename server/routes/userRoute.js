import express from 'express';
import { loginUser, registerUser } from '../controllers/userController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import {body} from 'express-validator';

const userRouter = express.Router();


userRouter.post('/register',
     body('email').isEmail().withMessage('Please enter a valid email'),
     body('password').isLength({min:6}).withMessage('Password must be at least 6 characters'),
     body('name').isLength({min:3}).withMessage('Name must be at least 3 characters'),
     body('username').isLength({min:3}).withMessage('Username must be at least 3 characters'),
     registerUser );
userRouter.post('/login',
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password').isLength({min:6}).withMessage('Password must be at least 6 characters'),
    loginUser);


export default userRouter;