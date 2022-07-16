import { Task } from '../enums/task.enum';

export interface ITask {
    title: { type: string },
    status: { type: Task },
    userId: any
}