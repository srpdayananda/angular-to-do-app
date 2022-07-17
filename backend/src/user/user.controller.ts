import express from 'express';
import bcrypt from 'bcrypt';

import User from './user.model';
import isManager from '../common/permission/isManager'
import { IRequest } from '../common/interfaces/request';

export default {
    async getUsers(req: IRequest, res: express.Response) {
        try {
            let query = { role: "USER" }

            const foundUsers = await User.find(query)
            const modifyUser = foundUsers.map((user: any) => {
                return { id: user._id, email: user.email, name: user.name, password: user.password, role: user.role, accessToken: user.accessToken }
            })

            return res.status(200).send({
                success: true,
                message: 'Users getting successfull',
                users: modifyUser
            })
        }
        catch (err) {
            return res.status(500).send({
                success: false,
                error: 'Internal Server Error'
            })
        }

    },
    async createUser(req: IRequest, res: express.Response) {
        console.log(req.body)
        try {
            const isManagerRole = await isManager(req.user.userId);
            if (!isManagerRole) {
                return res.status(500).send({
                    success: false,
                    message: 'You have to not permission'
                })
            }

            const reqBody = req.body;
            const errors = [];

            if (!reqBody.email) {
                errors.push('Email is required')
            }
            if (!reqBody.name) {
                errors.push('User name is required')
            }
            if (!reqBody.role) {
                errors.push('Pick up the user role')
            }
            const foundUser = await User.findOne({ email: req.body.email })
            if (foundUser) {
                errors.push('User with Email allready added, choose differnt email address')
            }
            if (errors.length > 0) {
                return res.status(500).send({
                    success: false,
                    errors: errors
                })
            }
            if (!foundUser) {
                const password = await bcrypt.hash("12345678", 10);

                const createUser = await User.create({
                    email: req.body.email,
                    password: password,
                    name: req.body.name,
                    role: req.body.role,
                    accessToken: null
                })
                return res.status(200).send({
                    success: true,
                    message: "Add new user successfully",
                    user: createUser
                })
            }
        }
        catch (err) {
            return res.status(500).send({
                success: false,
                error: 'Internal Server Error'
            })
        }
    }
}