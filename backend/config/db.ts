import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

import User from '../src/user/user.model';

export default {
    async connect() {
        try {
            await mongoose.connect(
                "mongodb://localhost/angular_todo_app",
                { useNewUrlParser: true }
            );
            const user = await User.findOne({ email: "admin@todo.com" });
            console.log("...Database connected successfully...");
            const password = await bcrypt.hash("12345678", 10);
            if (!user) {
                await User.create({
                    email: "admin@todo.com",
                    name: "admin",
                    password: password,
                    role: "MANAGER",
                    accessToken: null,
                });
            }
        } catch (error) {
            console.error(JSON.stringify(error));
        }
    },
}