import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Announcement } from 'src/app/models/announcement';
import { AnnouncementService } from 'src/app/services/announcement.service';

@Component({
  selector: 'gs-announcement-edit',
  templateUrl: './announcement-edit.component.html',
  styleUrls: ['./announcement-edit.component.css']
})
export class AnnouncementEditComponent implements OnInit {
  announcement: Announcement

  constructor(private announcementService: AnnouncementService, private activatedroute: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadAnnouncement();
  }

  loadAnnouncement(){
    const announcementId = this.activatedroute.snapshot.params['id'];
    this.announcementService.getAnnouncement(announcementId).subscribe(response => {
      this.announcement = response;
    })
  }

}
