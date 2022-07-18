import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { Task } from './../../../../../../backend/src/common/enums/task';
import { TaskService } from 'src/app/core/services/task/task.service';
import { ToastrService } from 'ngx-toastr';
import { RebuildTaskService } from 'src/app/core/services/rebuild-task/rebuild-task.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { IUser } from 'src/app/shared/interfaces/user.interface';
import { AUTH_USER } from 'src/app/core/constant/constant';
import { Role } from './../../../../../../backend/src/common/enums/role';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  formAddTask: FormGroup;
  statuss: Array<string>;
  usersList: Array<IUser>
  userId: string | null;
  isManagerLogged: boolean;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private toastr: ToastrService,
    private rebuildTaskService: RebuildTaskService,
    private usersService: UserService
  ) {
    this.statuss = Object.keys(Task)
    this.userId = null
    this.isManagerLogged = false
  }

  ngOnInit(): void {
    this.isManager()
    this.getUsers()
    this.form()
  }

  private form() {
    this.formAddTask = this.fb.group({
      id: this.userId,
      title: new FormControl(null, Validators.required),
      status: new FormControl(this.statuss[0], Validators.required)
    })
  }

  addTask() {
    if (this.formAddTask.invalid) {
      return;
    }
    this.taskService.createTask(this.formAddTask.value).subscribe((response) => {
      if (response.success) {
        this.toastr.success(response.message)
      }
    }, (err) => {
      console.log(err)
    })
  }

  getUsers() {
    this.usersService.getUsers().subscribe((response) => {
      if (response.success) {
        this.usersList = response.users
      }
    }, (err) => {
      console.log(err)
    })
  }

  isManager() {
    const loggedUser = localStorage.getItem(AUTH_USER)
    const user = JSON.parse(loggedUser!)
    if (user.role === Role.MANAGER) {
      this.isManagerLogged = true;
    }
  }



  selectUser(id: string) {
    if (id) {
      this.userId = id
      this.form()
    }
  }

}
