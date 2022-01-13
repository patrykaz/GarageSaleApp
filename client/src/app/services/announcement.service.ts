import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AnnouncementCard } from '../models/announcementCard';
import { AnnouncementDetails } from '../models/announcementDetails';
import { AnnouncementEditCard } from '../models/announcementEditCard';
import { NewAnnouncement } from '../models/newAnnouncement';
import { AnnouncementParams, UserAnnouncementParams } from '../models/userParams';
import { getPaginationHeaders, getPaginationResult } from './paginationHelper';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {
  baseUrl = environment.apiUrl;
  announcements: AnnouncementCard[] = [];
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

    return getPaginationResult<AnnouncementCard[]>(this.baseUrl + 'Announcements', this.announcementParams, this.http)
  }

  getUserAnnouncements(userAnnouncementParams: UserAnnouncementParams){
    let params = getPaginationHeaders(userAnnouncementParams.pageNumber, userAnnouncementParams.pageSize);

    params = params.append('orderBy', userAnnouncementParams.orderBy)

    return getPaginationResult<AnnouncementEditCard[]>(this.baseUrl + 'User-Announcements', this.userAnnouncementParams, this.http)
  }

  getAnnouncement(id: number){
    return this.http.get<AnnouncementDetails>(this.baseUrl + 'Announcements/' + id)
  }


  addAnnouncement(model: NewAnnouncement){
    return this.http.post<AnnouncementDetails>(this.baseUrl + 'Announcements', model)
  }

  updateAnnouncement(id: number,  model: NewAnnouncement){
    return this.http.put<AnnouncementDetails>(this.baseUrl + 'Announcements/' + id, model)
  }

  deleteAnnouncement(id: number){
    return this.http.delete<AnnouncementDetails>(this.baseUrl + 'Announcements/' + id)
  }

  changeStatusActiveOfAnnouncement(id: number){
    return this.http.put<AnnouncementDetails>(this.baseUrl + 'Announcements/' + id + '/change-status-active', {})
  }

  setMainPhoto(announcementId: number, photoId: number) {
    return this.http.put(this.baseUrl + "Announcements/" + announcementId + "/set-main-photo/" + photoId, {});
  }

  deletePhoto(announcementId: number, photoId: number){
    return this.http.delete(this.baseUrl + 'Announcements/' + announcementId + '/delete-photo/' + photoId);
  }
}

