import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AnnouncementEditCard } from 'src/app/models/announcementEditCard';

@Component({
  selector: 'gs-announcement-manage-card',
  templateUrl: './announcement-manage-card.component.html',
  styleUrls: ['./announcement-manage-card.component.css']
})
export class AnnouncementManageCardComponent implements OnInit {
  @Input() announcement: AnnouncementEditCard;
  @Output("parentDeleteAnnouncement") parentDeleteAnnouncement: EventEmitter<any> = new EventEmitter();
  @Output("parentChangeStatusActiveOfAnnouncement") parentChangeStatusActiveOfAnnouncement: EventEmitter<any> = new EventEmitter();

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
}
