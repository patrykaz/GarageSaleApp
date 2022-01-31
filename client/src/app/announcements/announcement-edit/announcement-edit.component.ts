import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnnouncementDetails } from 'src/app/models/announcementDetails';
import { Member } from 'src/app/models/member';
import { AnnouncementService } from 'src/app/services/announcement.service';
import { MemberService } from 'src/app/services/member.service';

@Component({
  selector: 'gs-announcement-edit',
  templateUrl: './announcement-edit.component.html',
  styleUrls: ['./announcement-edit.component.css']
})
export class AnnouncementEditComponent implements OnInit {
  announcement: AnnouncementDetails;
  userOfAccount: Member;

  constructor(private announcementService: AnnouncementService, private activatedroute: ActivatedRoute, private memberService: MemberService) { }

  ngOnInit(): void {
    this.loadAnnouncement();
    this.loadUserOfAccount();
  }

  loadAnnouncement(){
    const announcementId = this.activatedroute.snapshot.params['id'];
    this.announcementService.getAnnouncement(announcementId).subscribe(response => {
      this.announcement = response;
    })
  }

  loadUserOfAccount(){
    this.memberService.getCurrentUser().subscribe(userOfAccount => {
      this.userOfAccount = userOfAccount;
    })
  }

}
