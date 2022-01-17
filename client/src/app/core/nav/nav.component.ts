import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { AnnouncementService } from 'src/app/services/announcement.service';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'gs-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(
    public accountService: AccountService,
    private announcementService: AnnouncementService,
    private adminService: AdminService,
    private router: Router) { }

  ngOnInit(): void {
  }

  logout(){
    this.accountService.logout();
    this.announcementService.resetAnnouncementParams();
    this.announcementService.resetUserAnnouncementParams();
    this.adminService.resetMemberParams();
    this.router.navigateByUrl('/login');
  }
}
