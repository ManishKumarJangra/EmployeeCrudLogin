import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Login } from './../../models/login/login';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  currentUser: string = '';

  constructor(private httpClient: HttpClient) {}
  CheckUser(login: Login): Observable<any> {
    return this.httpClient
      .post<any>('https://localhost:7155/api/login', login)
      .pipe(
        map((user) => {
          if (user) {
            this.currentUser = user.username;
            localStorage['currentUser'] = JSON.stringify(user);
          }
          return null;
        })
      );
  }
}
