import { Component, OnInit } from '@angular/core';
import { Announcement } from 'src/app/models/announcement';
import { AnnouncementService } from 'src/app/services/announcement.service';

@Component({
  selector: 'gs-user-announcements',
  templateUrl: './user-announcements.component.html',
  styleUrls: ['./user-announcements.component.css']
})
export class UserAnnouncementsComponent implements OnInit {
  announcements: Announcement[];

  constructor(private announcementService: AnnouncementService, ) {}

  ngOnInit(): void {
    this.loadAnnouncements();
  }

  loadAnnouncements(){
    this.announcementService.getUserAnnouncements().subscribe(response => {
      this.announcements = response;
    })
  }
}
