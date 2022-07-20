import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RebuildTaskService } from 'src/app/core/services/rebuild-task/rebuild-task.service';

import { TaskService } from 'src/app/core/services/task/task.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { IUser } from 'src/app/shared/interfaces/user.interface';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  usersList: Array<IUser>
  @Output() selectedUserId = new EventEmitter<string | null>()
  @Output() selectAllTasks = new EventEmitter<boolean>()
  tasks: any;

  constructor(
    private userService: UserService,
    private taskService: TaskService,
    private rebuildTsService: RebuildTaskService
  ) {
    this.selectedUserId.emit(null)
    this.selectAllTasks.emit(false)
  }

  ngOnInit(): void {
    this.getUsers()
  }

  getUsers() {
    this.userService.getUsers().subscribe((response) => {
      if (response.success) {
        this.usersList = response.users;
      }
    }, (err) => {
      console.log(err)
    })
  }

  onSelectedItem(id?: string) {
    if (id) {
      this.selectedUserId.emit(id)
    }
  }

  getAllTasks() {
    this.selectAllTasks.emit(true)
    console.log('$$$')
  }

}
