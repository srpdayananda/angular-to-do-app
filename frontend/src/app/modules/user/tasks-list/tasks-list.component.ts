import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

import { Task } from 'src/app/shared/enums/task.enum';
import { RebuildTaskService } from 'src/app/core/services/rebuild-task/rebuild-task.service';
import { TaskService } from 'src/app/core/services/task/task.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.css']
})
export class TasksListComponent implements OnInit {
  todoTasks: any | [];
  inprogressTasks: any | [];
  doneTasks: any | [];
  id: string;
  status: string;
  title: string;

  constructor(
    private reTaskService: RebuildTaskService,
    private taskService: TaskService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.reTaskService.tasks
    this.onTodoTasks()
    this.onInprogressTasks()
    this.onDoneTasks()
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      event.previousContainer.data.filter((pTask: any) => {
        let props = {}

        if (pTask.status === Task.TODO) {

          event.container.data.filter((cTask: any) => {
            if (cTask.status === Task.TODO) {
              this.id = cTask._id
              this.status = Task.INPROGRESS
              this.title = cTask.title

              props = {
                id: this.id,
                status: this.status,
                title: this.title
              }
            }

          })
        }
        else {

          event.container.data.filter((task: any) => {
            if (task.status === Task.INPROGRESS) {
              this.id = task._id
              this.status = Task.DONE
              this.title = task.title

              props = {
                id: this.id,
                status: this.status,
                title: this.title
              }
            }
          })
        }
        this.taskService.updateTask(props).subscribe((response) => {
          console.log(response)
          if (response.success) {
            this.toastr.success(response.message)
          }
        }, (err) => {
          console.log(err)
        })
      });


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
