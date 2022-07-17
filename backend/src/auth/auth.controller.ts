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
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(500).send({
                    success: false,
                    message: 'Login fail',
                    error: 'Email address not registired'
                })
            }
            const passwordMatch = await bcrypt.compare(password, user.password)
            if (!passwordMatch) {
                return res.status(500).send({
                    success: false,
                    message: 'Login fail',
                    error: 'Password incorrect'
                })
            }
            const token = jwt.sign({ userId: user._id }, TOKEN_KEY, { expiresIn: '1d' })
            await User.updateOne({ _id: user._id }, { accessToken: token })

            const userDetails = {
                id: user._id,
                email: user.email,
                password: user.password,
                name: user.name,
                role: user.role,
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