import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AnnouncementCard } from '../models/announcementCard';
import { AnnouncementDetails } from '../models/announcementDetails';
import { AnnouncementEditCard } from '../models/announcementEditCard';
import { Member } from '../models/member';
import { AdminAnnouncementParams, MemberParams } from '../models/userParams';
import { AccountService } from './account.service';
import { getPaginationHeaders, getPaginationResult } from './paginationHelper';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  baseUrl = environment.apiUrl;
  memberParams: MemberParams;
  adminAnnouncementParams: AdminAnnouncementParams;

  constructor(private http: HttpClient, private accountService: AccountService) {
    this.memberParams = new MemberParams();
    this.adminAnnouncementParams = new AdminAnnouncementParams();
  }

  getMemberParams() {
    return this.memberParams;
  }

  setMemberParams(params: MemberParams) {
    this.memberParams = params;
  }

  resetMemberParams(){
    this.memberParams = new MemberParams();
    return this.memberParams;
  }

  getAdminAnnouncementParams() {
    return this.adminAnnouncementParams;
  }

  setAdminAnnouncementParams(params: AdminAnnouncementParams) {
    this.adminAnnouncementParams = params;
  }

  resetAdminannouncementParams(){
    this.adminAnnouncementParams = new AdminAnnouncementParams();
    return this.adminAnnouncementParams;
  }

  getMembers(memberParams: MemberParams){
    let params = getPaginationHeaders(memberParams.pageNumber, memberParams.pageSize);

    params = params.append('orderBy', memberParams.orderBy)

    return getPaginationResult<Member[]>(this.baseUrl + 'Admin/users', this.memberParams, this.http)
  }

  roleModerator(userName: string){
    return this.http.put<Member>(this.baseUrl + 'Admin/users/' + userName + '/edit-roles', {})
  }

  getAdminAnnouncementsForApproval(adminAnnouncementParams: AdminAnnouncementParams){
    getPaginationHeaders(adminAnnouncementParams.pageNumber, adminAnnouncementParams.pageSize);

    return getPaginationResult<AnnouncementEditCard[]>(this.baseUrl + 'Admin/announcements-for-approval', this.adminAnnouncementParams, this.http)
  }

  changeStatusAcceptedOfAnnouncement(id: number){
    return this.http.put<AnnouncementDetails>(this.baseUrl + 'Admin/announcements/' + id + '/change-status-accepted', {})
  }
}
