import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountService } from '../services/account.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedInGuard implements CanActivate {

  constructor(private accountService: AccountService, private router: Router) {}

  canActivate(): boolean {
    const user = localStorage.getItem('user');
    console.log(user);
    if(user != null || user != undefined)
    {
      this.router.navigateByUrl('/')
      return false;
    }
    else {
        return true;
    }
  }
}
