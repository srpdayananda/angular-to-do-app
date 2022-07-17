import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { UserService } from 'src/app/core/services/user/user.service';
import { Role } from './../../../shared/enums/role.enum';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  addUserForm: FormGroup;
  userRoles: Array<string>

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private toastr:ToastrService
  ) {
    this.userRoles = Object.keys(Role)
  }

  ngOnInit(): void {
    this.addUserForm = this.fb.group({
      email: new FormControl(null, [Validators.required, Validators.email]),
      name: new FormControl(null, Validators.required),
      role: new FormControl(this.userRoles[1], Validators.required)
    })
  }

  onSubmit() {
    if (this.addUserForm.invalid) {
      return;
    }
    else {
      this.userService.createUser(this.addUserForm.value).subscribe((response) => {
        if(response.success) {
          this.toastr.success(response.message)
        }
      }, (err) => {
        console.log(err)
      })

    }
  }

}
