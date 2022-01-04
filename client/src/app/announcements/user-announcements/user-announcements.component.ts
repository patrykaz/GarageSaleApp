import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Announcement } from 'src/app/models/announcement';
import { AnnouncementService } from 'src/app/services/announcement.service';

@Component({
  selector: 'gs-user-announcements',
  templateUrl: './user-announcements.component.html',
  styleUrls: ['./user-announcements.component.css']
})
export class UserAnnouncementsComponent implements OnInit {
  announcements: Announcement[];

  constructor(private announcementService: AnnouncementService, private toastr: ToastrService ) {}

  ngOnInit(): void {
    this.loadAnnouncements();
  }

  loadAnnouncements(){
    this.announcementService.getUserAnnouncements().subscribe(response => {
      this.announcements = response;
    })
  }

  deleteAnnouncement(announcement: Announcement){
    this.announcementService.deleteAnnouncement(announcement.id).subscribe(() => {
      this.toastr.success("Ogłoszenie zostało pomyślnie usunięte.")
      this.loadAnnouncements();
    });
  }
}
