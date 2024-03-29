import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IUser } from 'src/app/shared/interfaces/user.interface';
import { AUTH_TOKEN, AUTH_USER } from '../../constant/constant';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private isLoggedIn: BehaviorSubject<boolean>
  private loggedUser: BehaviorSubject<IUser | null>

  constructor() {
    this.isLoggedIn = new BehaviorSubject<boolean>(false)
    this.loggedUser = new BehaviorSubject<IUser | null>(null)
  }

  setIsLoggedIn(isLoggedIn: boolean): void {
    this.isLoggedIn.next(isLoggedIn)
  }

  getIsLoggedIn(): Observable<boolean> {
    const token = localStorage.getItem(AUTH_TOKEN)
    if (token) {
      this.setIsLoggedIn(true);
      return this.isLoggedIn.asObservable()
    }
    return this.isLoggedIn.asObservable()
  }

  setLoggedUser(loggedUser: IUser): void {
    const { id, email, name, password, role } = loggedUser;
    localStorage.setItem(AUTH_USER, JSON.stringify({ id, email, name, password, role }))
    this.loggedUser.next(loggedUser);
  }

  getLoggedUser(): Observable<IUser | null> {
    const storageUser = localStorage.getItem(AUTH_USER);
    if (storageUser) {
      this.setLoggedUser(JSON.parse(storageUser))
      return this.loggedUser.asObservable()
    }
    return this.loggedUser.asObservable()
  }
}
