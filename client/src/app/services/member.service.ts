import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Member } from '../models/member';
import { UpdateUser } from '../models/updateUser';
import { User } from '../models/user';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class MemberService{
  baseUrl = environment.apiUrl;
  member: Member;


  constructor(private http: HttpClient, private accountService: AccountService) {}


  getCurrentUser(){
    return this.http.get<Member>(this.baseUrl + 'users/current-user');
  }

  updateUserAccount(user: UpdateUser){
    return this.http.put<Member>(this.baseUrl + 'users', user);
  }
}
