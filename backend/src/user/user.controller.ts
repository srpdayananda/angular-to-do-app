import express from 'express';
import User from './user.model';

export default {
    async getUsers(req: express.Request, res: express.Response) {
        try {
            const foundUsers = await User.find()
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

    }
}