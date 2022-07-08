import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['MANAGER', 'USER'] },
    accessToken: { type: String },
})

export default mongoose.model('user', userSchema)