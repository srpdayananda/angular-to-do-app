import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { UserHttpResponse } from 'src/app/shared/types/user.props';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl: string

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl;
  }

  getUsers(): Observable<UserHttpResponse> {
    return this.http.get<UserHttpResponse>(`${this.apiUrl}/user`)
  }
}
