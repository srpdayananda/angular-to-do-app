import { ITask } from '../interfaces/task.interface';
import { CommonResponse } from './common.response';

export type TaskHttpResponse = CommonResponse & {
    task: ITask;
}

export type TasksHttpResponse = CommonResponse & {
    tasks: Array<ITask>;
}