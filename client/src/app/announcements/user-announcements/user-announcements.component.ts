import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AnnouncementEditCard } from 'src/app/models/announcementEditCard';
import { Pagination } from 'src/app/models/pagination';
import { AnnouncementParams, UserAnnouncementParams } from 'src/app/models/userParams';
import { AnnouncementService } from 'src/app/services/announcement.service';

@Component({
  selector: 'gs-user-announcements',
  templateUrl: './user-announcements.component.html',
  styleUrls: ['./user-announcements.component.css']
})
export class UserAnnouncementsComponent implements OnInit {
  announcements: AnnouncementEditCard[];
  pagination: Pagination;
  userAnnouncementParams: UserAnnouncementParams;
  btnActive = true;

  constructor(private announcementService: AnnouncementService, private toastr: ToastrService ) {
    this.userAnnouncementParams = this.announcementService.getUserAnnouncementParams();
  }

  ngOnInit(): void {
    this.loadAnnouncements();
  }

  loadAnnouncements(){
       // zastosowanie parametrów użytkownika
    this.announcementService.setUserAnnouncementParams(this.userAnnouncementParams);
    this.announcementService.getUserAnnouncements(this.userAnnouncementParams).subscribe(response => {
      this.announcements = response.result;
      this.pagination = response.pagination;
    })
  }

  deleteAnnouncement(announcement: AnnouncementEditCard){
    this.announcementService.deleteAnnouncement(announcement.id).subscribe(() => {
      this.toastr.success("Ogłoszenie zostało pomyślnie usunięte.")
      this.loadAnnouncements();
    });
  }

  changeStatusActiveOfAnnouncement(announcement: AnnouncementEditCard){
    this.announcementService.changeStatusActiveOfAnnouncement(announcement.id).subscribe(() => {
      this.toastr.success("Status ogłoszenia został zmieniony")
      this.loadAnnouncements();
    });
  }

  loadActiveAnnouncements(){
    this.btnActive = !this.btnActive;
    this.userAnnouncementParams.isActive = true;
    this.loadAnnouncements();
  }

  loadUnactiveAnnouncements(){
    this.btnActive = !this.btnActive;
    this.userAnnouncementParams.isActive = false;
    this.loadAnnouncements();
  }

  pageChanged(event: any){
    this.userAnnouncementParams.pageNumber = event.page;
    this.announcementService.setUserAnnouncementParams(this.userAnnouncementParams);
    this.loadAnnouncements();
  }
}
