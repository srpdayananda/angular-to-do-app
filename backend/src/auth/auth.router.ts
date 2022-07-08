import express from 'express';

import AuthController from './auth.controller';

export const userRouter = express.Router();
userRouter.route('/').post(AuthController.login)