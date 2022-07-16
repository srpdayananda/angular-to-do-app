import mongoose from 'mongoose';

import { Task } from '../common/enums/task';

const taskSchema = new mongoose.Schema({
    title: { type: String, require: true },
    status: { type: String, enum: [Task.TODO, Task.INPROGRESS, Task.DONE], default: Task.TODO },
    userId: { type: mongoose.Types.ObjectId, required: true ,ref:'user'}
})

export default mongoose.model('task', taskSchema)