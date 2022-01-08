import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Announcement } from '../models/announcement';
import { NewAnnouncement } from '../models/newAnnouncement';
import { AnnouncementParams, UserAnnouncementParams } from '../models/userParams';
import { getPaginationHeaders, getPaginationResult } from './paginationHelper';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {
  baseUrl = environment.apiUrl;
  announcements: Announcement[] = [];
  memberCache = new Map();
  announcementParams: AnnouncementParams;
  userAnnouncementParams: UserAnnouncementParams;

  constructor(private http: HttpClient) {
    this.announcementParams = new AnnouncementParams();
    this.userAnnouncementParams = new UserAnnouncementParams();
  }

  getAnnouncementParams() {
    return this.announcementParams;
  }

  setAnnouncementParams(params: AnnouncementParams) {
    this.announcementParams = params;
  }

  resetAnnouncementParams(){
    this.announcementParams = new AnnouncementParams();
    return this.announcementParams;
  }

  getUserAnnouncementParams() {
    return this.userAnnouncementParams;
  }

  setUserAnnouncementParams(params: UserAnnouncementParams) {
    this.userAnnouncementParams = params;
  }

  resetUserAnnouncementParams(){
    this.userAnnouncementParams = new UserAnnouncementParams();
    return this.announcementParams;
  }


  getAnnouncements(announcementParams: AnnouncementParams){
    let params = getPaginationHeaders(announcementParams.pageNumber, announcementParams.pageSize);

    params = params.append('orderBy', announcementParams.orderBy)

    return getPaginationResult<Announcement[]>(this.baseUrl + 'Announcements', this.announcementParams, this.http)
  }

  getUserAnnouncements(userAnnouncementParams: UserAnnouncementParams){
    let params = getPaginationHeaders(userAnnouncementParams.pageNumber, userAnnouncementParams.pageSize);

    params = params.append('orderBy', userAnnouncementParams.orderBy)

    return getPaginationResult<Announcement[]>(this.baseUrl + 'User-Announcements', this.userAnnouncementParams, this.http)
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

  setMainPhoto(announcementId: number, photoId: number) {
    return this.http.put(this.baseUrl + "Announcements/" + announcementId + "/set-main-photo/" + photoId, {});
  }

  deletePhoto(announcementId: number, photoId: number){
    return this.http.delete(this.baseUrl + 'Announcements/' + announcementId + '/delete-photo/' + photoId);
  }
}

