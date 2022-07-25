import { Task } from '../enums/task.enum';

export interface ITask {
    _id: { type: string },
    title: { type: string },
    status: { type: Task },
    userId: any
}