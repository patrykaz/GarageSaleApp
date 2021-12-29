import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, of, take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Announcement } from '../models/announcement';
import { UserParams } from '../models/userParams';
import { getPaginationHeaders, getPaginationResult } from './paginationHelper';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {
  baseUrl = environment.apiUrl;
  announcements: Announcement[] = [];
  memberCache = new Map();
  userParams: UserParams;

  constructor(private http: HttpClient) {
    this.userParams = new UserParams();
  }

  getUserParams() {
    return this.userParams;
  }

  setUserParams(params: UserParams) {
    this.userParams = params;
  }

  resetUserParams(){
    this.userParams = new UserParams();
    return this.userParams;
  }

  getAnnouncements(userParams: UserParams){
    var response = this.memberCache.get(Object.values(userParams).join('-'));
    if (response) {
      return of(response);
    }
    console.log(this.userParams);
    let params = getPaginationHeaders(userParams.pageNumber, userParams.pageSize);

    params = params.append('orderBy', userParams.orderBy)

    return getPaginationResult<Announcement[]>(this.baseUrl + 'Announcements', this.userParams, this.http)
      .pipe(map( response => {
        this.memberCache.set(Object.values(userParams).join('-'), response)
        return response;
      }))
  }
}

