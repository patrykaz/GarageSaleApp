import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Member } from '../models/member';
import { MemberParams } from '../models/userParams';
import { AccountService } from './account.service';
import { getPaginationHeaders, getPaginationResult } from './paginationHelper';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  baseUrl = environment.apiUrl;
  members: Member[] = [];
  memberParams: MemberParams

  constructor(private http: HttpClient, private accountService: AccountService) {
    this.memberParams = new MemberParams();
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

  getMembers(memberParams: MemberParams){
    let params = getPaginationHeaders(memberParams.pageNumber, memberParams.pageSize);

    params = params.append('orderBy', memberParams.orderBy)

    return getPaginationResult<Member[]>(this.baseUrl + 'Admin/users', this.memberParams, this.http)
  }

}
