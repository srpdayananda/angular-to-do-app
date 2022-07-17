import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalModule, BsModalService } from 'ngx-bootstrap/modal';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatInputModule } from '@angular/material/input';
import { TasksListComponent } from './tasks-list/tasks-list.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { UsersListComponent } from './users-list/users-list.component';
import { MatDialogModule } from '@angular/material/dialog';
import { AddUserComponent } from './add-user/add-user.component';



@NgModule({
  declarations: [
    UserComponent,
    TasksListComponent,
    AddTaskComponent,
    UsersListComponent,
    AddUserComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    MatButtonModule,
    MatSelectModule,
    DragDropModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatRadioModule,
    MatDialogModule,
    ModalModule.forRoot()
  ],
  providers: [
    BsModalService
  ]
})
export class UserModule { }
