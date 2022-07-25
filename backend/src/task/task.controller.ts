import express, { query } from 'express';
import mongoose from 'mongoose'

import { IRequest } from '../common/interfaces/request';
import Task from './task.model';

export default {
    async create(req: IRequest, res: express.Response) {
        try {
            const id = req.body.id
            if (id) {
                const task = await Task.create({
                    title: req.body.title,
                    status: req.body.status,
                    userId: req.body.id
                })
                return res.status(200).send({
                    success: true,
                    message: 'manager create new task successfully',
                    task: task
                })
            } else {
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
            let query;
            if (req.query.id) {
                query = { userId: req.query.id }
            } else {
                query = {}
            }

            const tasks = await Task.find(query).populate('userId', 'name')
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

    },
    async update(req: IRequest, res: express.Response) {
        try {
            const findTask = await Task.findOne({ _id: req.body.id })
            if (!findTask) {
                return res.status(500).send({
                    success: false,
                    error: "Can't find relavant task id"
                })
            }

            const query = { _id: req.body.id }
            const newValue = {
                title: req.body.title,
                status: req.body.status
            }
            const updateTask = await Task.updateOne(query, newValue)
            return res.status(200).send({
                success: true,
                message: 'Task update successfully',
                task: updateTask
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
