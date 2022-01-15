import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AnnouncementCard } from 'src/app/models/announcementCard';
import { AnnouncementEditCard } from 'src/app/models/announcementEditCard';
import { Pagination } from 'src/app/models/pagination';
import { AdminAnnouncementParams } from 'src/app/models/userParams';
import { AdminService } from 'src/app/services/admin.service';
import { AnnouncementService } from 'src/app/services/announcement.service';

@Component({
  selector: 'gs-announcements-list-for-approval',
  templateUrl: './announcements-list-for-approval.component.html',
  styleUrls: ['./announcements-list-for-approval.component.css']
})
export class AnnouncementsListForApprovalComponent implements OnInit {
  announcements: AnnouncementEditCard[];
  adminAnnouncementParams: AdminAnnouncementParams;
  pagination: Pagination;
  btnActive = true;

  constructor(private adminService: AdminService, private toastr: ToastrService, private announcementService: AnnouncementService ) {
    this.adminAnnouncementParams = this.adminService.getAdminAnnouncementParams();
  }

  ngOnInit(): void {
    this.loadAnnouncements();
  }

  loadAnnouncements(){
       // zastosowanie parametrów użytkownika
    this.adminService.setAdminAnnouncementParams(this.adminAnnouncementParams);
    this.adminService.getAdminAnnouncementsForApproval(this.adminAnnouncementParams).subscribe(response => {
      this.announcements = response.result;
      this.pagination = response.pagination;
      console.log(this.announcements)
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

  changeStatusAcceptedOfAnnouncement(announcement: AnnouncementEditCard){
    this.adminService.changeStatusAcceptedOfAnnouncement(announcement.id).subscribe(() => {
      this.toastr.success("Status ogłoszenia został zmieniony")
      this.loadAnnouncements();
    });
  }

  // loadActiveAnnouncements(){
  //   this.btnActive = !this.btnActive;
  //   this.userAnnouncementParams.isActive = true;
  //   this.loadAnnouncements();
  // }

  // loadUnactiveAnnouncements(){
  //   this.btnActive = !this.btnActive;
  //   this.userAnnouncementParams.isActive = false;
  //   this.loadAnnouncements();
  // }

  pageChanged(event: any){
    this.adminAnnouncementParams.pageNumber = event.page;
    this.adminService.setAdminAnnouncementParams(this.adminAnnouncementParams);
    this.loadAnnouncements();
  }
}
