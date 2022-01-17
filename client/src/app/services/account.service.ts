import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
import { AdminService } from './admin.service';
import { AnnouncementService } from './announcement.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = environment.apiUrl;
  private currentUserSource = new ReplaySubject<User>(1); // przechowywanie 1 wartosci uzytkownika
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient) { }

  login(model: any) {
    return this.http.post<User>(this.baseUrl + 'Account/Login', model).pipe(
      map((user: User) => {
        if (user) {
          this.setCurrentUser(user);
        }
      })
    )
  }

  register(model: any) {
    return this.http.post(this.baseUrl + 'Account/Register', model).pipe(
      map((user: User) =>{
        if (user) {
          this.setCurrentUser(user)
        }
      })
    )
  }

  setCurrentUser(user: User){
    user.roles = [];
    const roles = this.getDecodedToken(user.token).role;
    Array.isArray(roles) ? user.roles = roles : user.roles.push(roles);
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSource.next(user);
  }

  logout(){
    localStorage.removeItem('user'); // usuwa uzytkownika z pamieci lokalnej przegladarki
    this.currentUserSource.next(null);
  }
  getDecodedToken(token: string){
    return JSON.parse(atob(token.split('.')[1])); // 1 = get a part of token
  }
}
