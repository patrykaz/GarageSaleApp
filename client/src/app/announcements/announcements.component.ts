import { Component, OnInit } from '@angular/core';
import { Announcement } from '../models/announcement';
import { Pagination } from '../models/pagination';
import { AnnouncementParams } from '../models/userParams';
import { AnnouncementService } from '../services/announcement.service';

@Component({
  selector: 'gs-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.css']
})
export class AnnouncementsComponent implements OnInit {
  announcements: Announcement[];
  pagination: Pagination;
  announcementParams: AnnouncementParams;
  sortList = [
    {value: null, display: ""},
    {value: 'dateCreatedNew', display: "Najnowsze"},
    {value: "dateCreatedOld", display: "Najstarsze"},
    {value: "startDate", display: "Nadchodzące"},
  ]

  constructor(private announcementService: AnnouncementService, ) {
    this.announcementParams = this.announcementService.getAnnouncementParams();
   }

  ngOnInit(): void {
    this.loadAnnouncements();
  }

  loadAnnouncements(){
    this.announcementService.setAnnouncementParams(this.announcementParams);
    // zastosowanie parametrów użytkownika
    this.announcementService.getAnnouncements(this.announcementParams).subscribe(response => {
      this.announcements = response.result;
      this.pagination = response.pagination;
    })
  }

  resetFilters() {
    this.announcementParams = this.announcementService.resetAnnouncementParams();
    this.loadAnnouncements();
  }

  pageChanged(event: any){
    this.announcementParams.pageNumber = event.page;
    this.announcementService.setAnnouncementParams(this.announcementParams);
    this.loadAnnouncements();
  }
}
