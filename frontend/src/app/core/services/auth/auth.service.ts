import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../../environments/environment';
import { AuthInputProps, AuthResponse } from 'src/app/shared/types/auth.props';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private API_URL: string;

  constructor(private http: HttpClient) {
    this.API_URL = environment.apiUrl;
  }

  login(props: AuthInputProps): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_URL}/login`, props)
  }
}
