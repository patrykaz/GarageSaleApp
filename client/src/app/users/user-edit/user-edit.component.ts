import { Component, OnInit } from '@angular/core';
import { Member } from 'src/app/models/member';
import { User } from 'src/app/models/user';
import { AccountService } from 'src/app/services/account.service';
import { MemberService } from 'src/app/services/member.service';

@Component({
  selector: 'gs-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  member: Member;

  constructor(private memberService: MemberService) { }

  ngOnInit(): void {
    this.loadUserOfAccount();
  }

  loadUserOfAccount(){
    this.memberService.getUserOfAccount().subscribe(user => {
      this.member = user;
    })

  }

}
