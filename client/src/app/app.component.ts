import { Component } from '@angular/core';
import { User } from './models/user';
import { AccountService } from './services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Wyprzedaże garażowe';

  users: any

  constructor(private accountService: AccountService){

  }

  ngOnInit() {
    this.setCurrentUser();
  }

  setCurrentUser(){
    const user: User = JSON.parse(localStorage.getItem('user'));  // pobranie aktualnego uzytkownika z pamieci lokalnej przegladarki, jesli nie ma to null
    if(user){
      this.accountService.setCurrentUser(user);
    }
  }

}
