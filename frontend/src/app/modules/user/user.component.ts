import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { RebuildTaskService } from 'src/app/core/services/rebuild-task/rebuild-task.service';
import { TaskService } from 'src/app/core/services/task/task.service';
import { ITask } from 'src/app/shared/interfaces/task.interface';
import { AddTaskComponent } from './add-task/add-task.component';
import { AddUserComponent } from './add-user/add-user.component';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  tasksList: Array<ITask> | [];
  selectUserId: string | null;


  constructor(
    private taskService: TaskService,
    private reBuildTaskService: RebuildTaskService,
    private dailog: MatDialog,
  ) {
  }

  ngOnInit(): void {
  }

  getTasks() {
    this.taskService.getTasks(this.selectUserId!).subscribe((response) => {
      if (response.success) {
        console.log('$$$', response.tasks)
        this.tasksList = response.tasks || [];
        this.reBuildTaskService.tasks = this.tasksList
        this.selectUserId = null
      }
    }, (err) => {
      console.log(err)
    })
  }

  onSelectedUserId(id: string | null) {
    if (id) {
      this.selectUserId = id
      this.getTasks();
      this.reBuildTaskService.todoStatusArray()
      this.reBuildTaskService.inprogressStatusArray()
      this.reBuildTaskService.doneStatusArray()
    }
  }

  onSelectedAllTasks(yes: boolean) {
    if (yes) {
      this.getTasks()
    }
  }

  addTaskModal() {
    this.dailog.open(AddTaskComponent)
  }

  addUserModal() {
    this.dailog.open(AddUserComponent)
  }

}
