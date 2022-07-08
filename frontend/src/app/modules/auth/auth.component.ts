import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/core/services/auth/auth.service';
import { ToastrService } from 'ngx-toastr'
import { AUTH_TOKEN, AUTH_USER } from 'src/app/core/constant/constant';
import { DataService } from 'src/app/core/services/data/data.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(8)]]
    })
  }


  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    this.authService.login(this.loginForm.value).subscribe((response) => {
      if (response.success) {
        this.toastr.success(response.message)
        localStorage.setItem(AUTH_TOKEN, response.user.accessToken)

        const { id, email, name, role, password } = response.user
        this.dataService.setIsLoggedIn(true)
        this.dataService.setLoggedUser({
          id, email, name, role, password
        })
        this.router.navigate(['/user'])
      }
    }, (err) => {
      this.toastr.error(err?.error?.error)
    })
  }

}
