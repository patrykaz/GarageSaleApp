import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AnnouncementEditCard } from 'src/app/models/announcementEditCard';
import { Pagination } from 'src/app/models/pagination';
import { UserAnnouncementParams } from 'src/app/models/userParams';
import { AnnouncementService } from 'src/app/services/announcement.service';

@Component({
  selector: 'gs-user-announcements-list',
  templateUrl: './user-announcements-list.component.html',
  styleUrls: ['./user-announcements-list.component.css']
})
export class UserAnnouncementsListComponent implements OnInit {
  announcements: AnnouncementEditCard[];
  pagination: Pagination;
  userAnnouncementParams: UserAnnouncementParams;
  btn1 = true;
  btn2 = false;
  btn3 = false;

  constructor(private announcementService: AnnouncementService, private toastr: ToastrService ) {
    this.userAnnouncementParams = this.announcementService.getUserAnnouncementParams();
  }

  ngOnInit(): void {
    this.loadActiveAnnouncements()
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
    this.btnService(1);
    this.userAnnouncementParams.isActive = true;
    this.userAnnouncementParams.isAccepted = true;
    this.loadAnnouncements();
  }

  loadAnnouncementsToAccept(){
    this.btnService(2);
    this.userAnnouncementParams.isActive = true;
    this.userAnnouncementParams.isAccepted = false;
    this.loadAnnouncements();
  }

  loadUnactiveAnnouncements(){
    this.btnService(3);
    this.userAnnouncementParams.isActive = false;
    this.userAnnouncementParams.isAccepted = false;
    this.loadAnnouncements();
  }

  pageChanged(event: any){
    this.userAnnouncementParams.pageNumber = event.page;
    this.announcementService.setUserAnnouncementParams(this.userAnnouncementParams);
    this.loadAnnouncements();
  }

  btnService(nr: number){
    switch (nr){
      case 1:
        this.btn1 = true
        this.btn2 = false
        this.btn3 = false
        break;
      case 2:
        this.btn1 = false
        this.btn2 = true
        this.btn3 = false
        break;
      case 3:
        this.btn1 = false
        this.btn2 = false
        this.btn3 = true
        break;
    }
  }
}
