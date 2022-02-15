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
  showToggle = false;
  bigScreen = true;

  constructor(
    public accountService: AccountService,
    private announcementService: AnnouncementService,
    private adminService: AdminService,
    private router: Router) { }

  ngOnInit(): void {
    this.bigScreen = window.innerWidth > 1100;
    window.addEventListener("resize", event => {
      this.bigScreen = window.innerWidth > 1100;
      if(this.bigScreen == true)
        this.showToggle = false
    });
    this.bigScreen = true;
  }

  onToggle() {
    this.showToggle = !this.showToggle;
  }

  logout(){
    this.accountService.logout();
    this.announcementService.resetAnnouncementParams();
    this.announcementService.resetUserAnnouncementParams();
    this.adminService.resetMemberParams();
    this.router.navigateByUrl('/login');
    this.showToggle = false;
  }
}
