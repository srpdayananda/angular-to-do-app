import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { RebuildTaskService } from 'src/app/core/services/rebuild-task/rebuild-task.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { IUser } from 'src/app/shared/interfaces/user.interface';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  usersList: Array<IUser>
  selectValue: string
  @Output() selectedUserId = new EventEmitter<string | null>()

  constructor(
    private userService: UserService,
    private rebuildTaskService: RebuildTaskService
  ) {
    this.selectedUserId.emit(null)
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

  onSelectedItem(id: string) {
    if (id) {
      this.selectedUserId.emit(id)
    }
  }

}
