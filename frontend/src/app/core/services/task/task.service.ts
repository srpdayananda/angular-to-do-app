import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { TaskHttpResponse, TasksHttpResponse } from 'src/app/shared/types/task.props';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl;
  }

  getTasks(id?: string): Observable<TasksHttpResponse> {
    let params = new HttpParams()
    if (id) {
      params = new HttpParams().append('id', id)
    }
    return this.http.get<TasksHttpResponse>(`${this.apiUrl}/task`, { params })
  }

  createTask(props: any): Observable<TaskHttpResponse> {
    return this.http.post<TaskHttpResponse>(`${this.apiUrl}/task`, props)
  }

  updateTask(props: any): Observable<TasksHttpResponse> {
    return this.http.put<TasksHttpResponse>(`${this.apiUrl}/task`, props)
  }

}
