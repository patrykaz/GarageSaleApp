import { Component, OnInit } from '@angular/core';
import { Member } from 'src/app/models/member';
import { MemberService } from 'src/app/services/member.service';

@Component({
  selector: 'gs-announcement-add',
  templateUrl: './announcement-add.component.html',
  styleUrls: ['./announcement-add.component.css']
})
export class AnnouncementAddComponent implements OnInit {
  userOfAccount: Member;

  constructor(private memberService: MemberService) { }

  ngOnInit(): void {
    this.loadUserOfAccount();
  }

  loadUserOfAccount(){
    this.memberService.getUserOfAccount().subscribe(userOfAccount => {
      this.userOfAccount = userOfAccount;
    })
  }

}
