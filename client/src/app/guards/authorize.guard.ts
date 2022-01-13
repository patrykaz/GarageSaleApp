import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../services/account.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizeGuard implements CanActivate {

  constructor(private accountService: AccountService, private toastr: ToastrService, private router: Router) {}

  canActivate(): boolean {
    const user = localStorage.getItem('user');
    console.log(user);
    if(user === null || user === undefined)
    {
      this.toastr.error('Brak autoryzacji! Zaloguj się lub zarejestruj.');
      this.router.navigateByUrl('/')
      return false;
    }
    else {
        return true;
    }
  }
}
