import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Member } from 'src/app/models/member';
import { Pagination } from 'src/app/models/pagination';
import { MemberParams } from 'src/app/models/userParams';
import { AdminService } from 'src/app/services/admin.service';
import { MemberService } from 'src/app/services/member.service';

@Component({
  selector: 'gs-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  members: Member[];
  pagination: Pagination;
  memberParams: MemberParams;

  genderList = [
    {value: null, display: ""},
    {value: 'male', display: "Mężczyźni"},
    {value: "female", display: "Kobiety"},
  ];

  roleList = [
    {value: null, display: ""},
    {value: 'Member', display: "Użytkownicy"},
    {value: "Moderator", display: "Moderatorzy"},
  ];

  sortList = [
    {value: null, display: ""},
    {value: 'dateCreatedNew', display: "Nowo utworzeni"},
    {value: "dateLastActive", display: "Ostatnio aktywni"},
  ];

  constructor(private toastr: ToastrService, private adminService: AdminService) {
    this.memberParams = this.adminService.getMemberParams()
  };

  ngOnInit(): void {
    this.loadMembers();
  }

  loadMembers(){
    this.adminService.setMemberParams(this.memberParams);
    this.adminService.getMembers(this.memberParams).subscribe(response => {
      this.members = response.result;
      this.pagination = response.pagination;
      console.log(this.members)
      console.log(this.pagination)
    })
  }

  // deleteAnnouncement(announcement: AnnouncementEditCard){
  //   this.announcementService.deleteAnnouncement(announcement.id).subscribe(() => {
  //     this.toastr.success("Ogłoszenie zostało pomyślnie usunięte.")
  //     this.loadAnnouncements();
  //   });
  // }

  // changeStatusActiveOfAnnouncement(announcement: AnnouncementEditCard){
  //   this.announcementService.changeStatusActiveOfAnnouncement(announcement.id).subscribe(() => {
  //     this.toastr.success("Status ogłoszenia został zmieniony")
  //     this.loadAnnouncements();
  //   });
  // }

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
    this.memberParams.pageNumber = event.page;
    this.adminService.setMemberParams(this.memberParams);
    this.loadMembers();
  }
}
