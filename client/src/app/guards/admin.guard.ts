import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map, Observable } from 'rxjs';
import { User } from '../models/user';
import { AccountService } from '../services/account.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  user: User;

  constructor(private accountService: AccountService, private toastr: ToastrService, private router: Router) {}

  canActivate(): boolean {
    this.accountService.currentUser$.subscribe(user => {
      this.user = user;
    })

    if (this.user.roles.includes('Admin'))
      return true;

    this.toastr.error('Brak odpowiednich uprawnień');
    this.router.navigateByUrl('/')
    return false;
  }
}
