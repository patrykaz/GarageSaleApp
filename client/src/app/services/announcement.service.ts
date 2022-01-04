import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, of, take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginComponent } from '../core/login/login.component';
import { Announcement } from '../models/announcement';
import { NewAnnouncement } from '../models/newAnnouncement';
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
    let params = getPaginationHeaders(userParams.pageNumber, userParams.pageSize);

    params = params.append('orderBy', userParams.orderBy)

    return getPaginationResult<Announcement[]>(this.baseUrl + 'Announcements', this.userParams, this.http)
  }

  getUserAnnouncements(){
    return this.http.get<Announcement[]>(this.baseUrl + 'User-Announcements')
  }

  getAnnouncement(id: number){
    return this.http.get<Announcement>(this.baseUrl + 'Announcements/' + id)
  }


  addAnnouncement(model: NewAnnouncement){
    return this.http.post<Announcement>(this.baseUrl + 'Announcements', model)
  }

  updateAnnouncement(id: number,  model: NewAnnouncement){
    return this.http.put<Announcement>(this.baseUrl + 'Announcements/' + id, model)
  }

  deleteAnnouncement(id: number){
    return this.http.delete<Announcement>(this.baseUrl + 'Announcements/' + id)
  }

  deletePhoto(announcementId: number, photoId: number){
    return this.http.delete(this.baseUrl + 'Announcements/' + announcementId + '/delete-photo/' + photoId);
  }
}

