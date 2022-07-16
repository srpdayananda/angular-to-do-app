import { Component, Input, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

import { ITask } from 'src/app/shared/interfaces/task.interface';
import { Task } from 'src/app/shared/enums/task.enum';
import { RebuildTaskService } from 'src/app/core/services/rebuild-task/rebuild-task.service';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.css']
})
export class TasksListComponent implements OnInit {
  todoTasks: any | [];
  inprogressTasks: any | [];
  doneTasks: any | [];

  constructor(private reTaskService: RebuildTaskService) { }

  ngOnInit(): void {
    this.onTodoTasks()
    this.onInprogressTasks()
    this.onDoneTasks()
  }

  drop(event: CdkDragDrop<string[]>) {
    console.log('%%%', event)
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  onTodoTasks() {
    this.todoTasks = this.reTaskService.todoStatusArray()
  }

  onInprogressTasks() {
    this.inprogressTasks = this.reTaskService.inprogressStatusArray();
  }

  onDoneTasks() {
    this.doneTasks = this.reTaskService.doneStatusArray();
  }
}
