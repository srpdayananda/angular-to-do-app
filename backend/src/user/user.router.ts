import express from 'express';
import userController from './user.controller';

export const userRouter = express.Router()
userRouter
    .route('/')
    .get(userController.getUsers)
    .post(userController.createUser)