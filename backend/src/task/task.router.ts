import express from 'express';
import taskController from './task.controller';

export const taskRouter = express.Router();
taskRouter
    .route('/')
    .post(taskController.create)
    .get(taskController.get)
    .put(taskController.update)