import { Component, OnInit } from '@angular/core';
import { AnnouncementCard } from 'src/app/models/announcementCard';
import { Pagination } from 'src/app/models/pagination';
import { AnnouncementParams } from 'src/app/models/userParams';
import { AnnouncementService } from 'src/app/services/announcement.service';


@Component({
  selector: 'gs-announcements-list',
  templateUrl: './announcements-list.component.html',
  styleUrls: ['./announcements-list.component.css']
})
export class AnnouncementsListComponent implements OnInit {
  announcements: AnnouncementCard[];
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
