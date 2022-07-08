import { Component, OnInit, ViewChild } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

import { TaskService } from 'src/app/core/services/task/task.service';
import { ITask } from 'src/app/shared/interfaces/task.interface';
import { Task } from '../../shared/enums/task.enum';
import { AddTaskComponent } from './add-task/add-task.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  @ViewChild('onAddTaskModal') onAddTaskModal: AddTaskComponent;
  tasksList: Array<ITask>;
  todo: Task;
  inprogress: Task;
  done: Task;

  constructor(private taskService: TaskService) {
    this.todo = Task.TODO;
    this.inprogress = Task.INPROGRESS;
    this.done = Task.DONE;
  }

  ngOnInit(): void {
    this.getTasks()
  }

  drop(event: CdkDragDrop<any>) {
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

  getTasks() {
    this.taskService.getTasks().subscribe((response) => {
      console.log(response)
      if (response.success) {
        this.tasksList = response.tasks;
      }
    }, (err) => {
      console.log(err)
    })
  }

  addTaskModal() {
    this.onAddTaskModal.openModal()
  }

}
