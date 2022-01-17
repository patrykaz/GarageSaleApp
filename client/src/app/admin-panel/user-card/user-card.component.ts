import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Member } from 'src/app/models/member';

@Component({
  selector: 'gs-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent implements OnInit {
  @Input() member: Member;
  @Output("parentSetRoleModerator") parentSetRoleModerator: EventEmitter<any> = new EventEmitter();
  @Output("parentSetUserAccountBlock") parentsetUserAccountBlock: EventEmitter<any> = new EventEmitter();
  isModerator: boolean

  constructor() { }

  ngOnInit(): void {
    this.isModerator = this.member.roles.find(x => x === "Moderator") != null;
  }

  setRoleModerator(member: Member){
    if(confirm("Czy na pewno chcesz zmienić role użytkownika?"))
        this.parentSetRoleModerator.emit(member);
  }

  setUserAccountBlock(member: Member){
    if(member.lockoutEnabled){
      if(confirm("Czy chcesz odblokować użytkownika?"))
        this.parentsetUserAccountBlock.emit(member);
    }
    else{
      if(confirm("Czy chcesz zablokować użytkownika?"))
        this.parentsetUserAccountBlock.emit(member);
    }
  }
}
