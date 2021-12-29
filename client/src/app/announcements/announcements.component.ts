import { Component, OnInit } from '@angular/core';
import { Announcement } from '../models/announcement';
import { Pagination } from '../models/pagination';
import { User } from '../models/user';
import { UserParams } from '../models/userParams';
import { AnnouncementService } from '../services/announcement.service';

@Component({
  selector: 'gs-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.css']
})
export class AnnouncementsComponent implements OnInit {
  announcements: Announcement[];
  pagination: Pagination;
  userParams: UserParams;

  constructor(private announcementService: AnnouncementService, ) {
    this.userParams = this.announcementService.getUserParams();
   }

  ngOnInit(): void {
    this.loadAnnouncements();
  }

  loadAnnouncements(){
    this.announcementService.setUserParams(this.userParams);
    // zastosowanie parametrów użytkownika
    this.announcementService.getAnnouncements(this.userParams).subscribe(response => {
      this.announcements = response.result;
      this.pagination = response.pagination;
      console.log(this.announcements);
    })
  }

  resetFilters() {
    this.userParams = this.announcementService.resetUserParams();
    this.loadAnnouncements();
  }

  pageChanged(event: any){
    this.userParams.pageNumber = event.page;
    this.announcementService.setUserParams(this.userParams);
    this.loadAnnouncements();
  }
}