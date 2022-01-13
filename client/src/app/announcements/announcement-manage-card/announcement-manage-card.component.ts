import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Announcement } from 'src/app/models/announcement';
import { AnnouncementService } from 'src/app/services/announcement.service';

@Component({
  selector: 'gs-announcement-manage-card',
  templateUrl: './announcement-manage-card.component.html',
  styleUrls: ['./announcement-manage-card.component.css']
})
export class AnnouncementManageCardComponent implements OnInit {
  @Input() announcement: Announcement;
  @Output("parentDeleteAnnouncement") parentDeleteAnnouncement: EventEmitter<any> = new EventEmitter();
  isActive: boolean;
  statusButton: string;

  constructor() { }

  ngOnInit(): void {
  
  }

  deleteAnnouncement(announcement: Announcement){
    if(confirm("Czy na pewno chcesz usunąć to gołoszenie?"))
        this.parentDeleteAnnouncement.emit(announcement);
  }

  statusChange(){
    this.announcement
  }
}
