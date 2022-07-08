import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User from '../user/user.model';
import { TOKEN_KEY } from '../../config/constant';

export default {
    async login(req: express.Request, res: express.Response) {
        try {
            const { email, password } = req.body;

            if (!(email && password)) {
                return res.status(500).send({
                    success: false,
                    message: 'Login fail',
                    error: 'Both email and password required'
                })
            }
            const foundUser = await User.findOne({ email });
            if (!foundUser) {
                return res.status(500).send({
                    success: false,
                    message: 'Login fail',
                    error: 'Email address not registired'
                })
            }
            const passwordMatch = await bcrypt.compare(password, foundUser.password)
            if (!passwordMatch) {
                return res.status(500).send({
                    success: false,
                    message: 'Login fail',
                    error: 'Password incorrect'
                })
            }
            const token = jwt.sign({ userId: foundUser._id }, TOKEN_KEY, { expiresIn: '1d' })
            await User.updateOne({ _id: foundUser._id }, { accessToken: token })

            const userDetails = {
                id: foundUser._id,
                email: foundUser.email,
                password: foundUser.password,
                name: foundUser.name,
                role: foundUser.role,
                accessToken: token
            }

            return res.status(200).send({
                success: true,
                message: 'Login successfull',
                user: userDetails
            })
        }
        catch (error) {
            return res.status(500).send({
                success: false,
                error: 'Internal Server Error'
            })
        }
    }
}