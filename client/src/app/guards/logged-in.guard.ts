import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { AccountService } from '../services/account.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedInGuard implements CanActivate {
  user: User;

  constructor(private accountService: AccountService, private router: Router) {}

  canActivate(): boolean {
    this.accountService.currentUser$.subscribe(user => {
      this.user = user;
    })

    if (!this.user)
      return true;

    this.router.navigateByUrl('/')
    return false;
  }
}
