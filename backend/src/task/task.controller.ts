import express from 'express';
import mongoose from 'mongoose'

import { IRequest } from '../common/interfaces/request';
import Task from './task.model';

export default {
    async create(req: IRequest, res: express.Response) {
        try {
            const task = await Task.create({
                title: req.body.title,
                status: req.body.status,
                userId: mongoose.Types.ObjectId(req.user.userId),
            })
            return res.status(200).send({
                success: true,
                message: 'task create successfull',
                task: task
            })

        }
        catch (err) {
            return res.status(500).send({
                success: false,
                error: 'Internal Server Error'
            })
        }
    },
    async get(req: IRequest, res: express.Response) {
        try {
            let query = { userId: req.query.id }

            const tasks = await Task.find(query)

            return res.status(200).send({
                success: true,
                message: 'get task successfull',
                tasks: tasks
            })
        }
        catch (err) {
            return res.status(500).send({
                success: false,
                error: 'Internal Server Error'
            })
        }

    }
}
