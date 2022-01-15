import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AnnouncementEditCard } from 'src/app/models/announcementEditCard';

@Component({
  selector: 'gs-announcement-admin-card',
  templateUrl: './announcement-admin-card.component.html',
  styleUrls: ['./announcement-admin-card.component.css']
})
export class AnnouncementAdminCardComponent implements OnInit {
  @Input() announcement: AnnouncementEditCard;
  @Output("parentDeleteAnnouncement") parentDeleteAnnouncement: EventEmitter<any> = new EventEmitter();
  @Output("parentChangeStatusActiveOfAnnouncement") parentChangeStatusActiveOfAnnouncement: EventEmitter<any> = new EventEmitter();
  @Output("parentChangeStatusAcceptedOfAnnouncement") parentChangeStatusAcceptedOfAnnouncement: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {

  }

  deleteAnnouncement(announcement: AnnouncementEditCard){
    if(confirm("Czy na pewno chcesz usunąć to gołoszenie?"))
        this.parentDeleteAnnouncement.emit(announcement);
  }

  changeStatusActiveOfAnnouncement(announcement: AnnouncementEditCard){
    if(confirm("Czy na pewno chcesz zmienić status ogłoszenia?")){
        this.parentChangeStatusActiveOfAnnouncement.emit(announcement);
    }
  }

  changeStatusAcceptedOfAnnouncement(announcement: AnnouncementEditCard){
    if(confirm("Czy na pewno chcesz zaakceptować ogłoszenie?")){
        this.parentChangeStatusAcceptedOfAnnouncement.emit(announcement);
    }
  }
}
