import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Member } from 'src/app/models/member';

@Component({
  selector: 'gs-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent implements OnInit {
  @Input() member: Member;
  @Output("parentRoleModerator") parentRoleModerator: EventEmitter<any> = new EventEmitter();
  //@Output("parentChangeStatusActiveOfAnnouncement") parentChangeStatusActiveOfAnnouncement: EventEmitter<any> = new EventEmitter();
  isModerator: boolean

  constructor() { }

  ngOnInit(): void {
    this.isModerator = this.member.roles.find(x => x === "Moderator") != null;
  }

  roleModerator(member: Member){
    if(confirm("Czy na pewno chcesz zmienić role użytkownika?"))
        this.parentRoleModerator.emit(member);
  }

  // changeStatusActiveOfAnnouncement(announcement: AnnouncementEditCard){
  //   if(confirm("Czy na pewno chcesz zmienić status ogłoszenia?")){
  //       this.parentChangeStatusActiveOfAnnouncement.emit(announcement);
  //   }
  // }

}
