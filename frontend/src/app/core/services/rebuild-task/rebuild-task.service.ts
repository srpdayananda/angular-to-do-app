import { Injectable } from '@angular/core';
import { ITask } from 'src/app/shared/interfaces/task.interface';

@Injectable({
  providedIn: 'root'
})
export class RebuildTaskService {
  tasks: any | [];

  constructor() {
  }

  todoStatusArray(): void {
    if (this.tasks) {
      const statusArray = this.tasks.filter((task: {
        title: string
        status: string
      }): boolean => {
        return task.status === 'TODO'
      })
      return statusArray;
    }
  }

  inprogressStatusArray(): void {
    if (this.tasks) {
      const statusArray = this.tasks.filter(function (task: {
        title: string
        status: string
      }): boolean {
        return task.status === 'INPROGRESS'
      })
      return statusArray;
    }
  }

  doneStatusArray(): void {
    if (this.tasks) {
      const statusArray = this.tasks.filter(function (task: {
        title: string
        status: string
      }): boolean {
        return task.status === 'DONE'
      })
      return statusArray;
    }
  }

}
