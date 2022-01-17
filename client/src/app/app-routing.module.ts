import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnnouncementAddComponent } from './announcements/announcement-add/announcement-add.component';
import { AnnouncementDetailsComponent } from './announcements/announcement-details/announcement-details.component';
import { AnnouncementEditComponent } from './announcements/announcement-edit/announcement-edit.component';
import { AnnouncementsListComponent } from './announcements/announcements-list/announcements-list.component';


import { UserAnnouncementsListComponent } from './announcements/user-announcements-list/user-announcements-list.component';
import { NotFoundComponent } from './core/errors/not-found/not-found.component';
import { ServerErrorComponent } from './core/errors/server-error/server-error.component';
import { LoginComponent } from './core/login/login.component';
import { RegisterComponent } from './core/register/register.component';
import { AuthorizeGuard } from './guards/authorize.guard';
import { LoggedInGuard } from './guards/logged-in.guard';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { UsersListComponent } from './admin-panel/users-list/users-list.component';
import { AnnouncementsListForApprovalComponent } from './admin-panel/announcements-list-for-approval/announcements-list-for-approval.component';
import { ModeratorGuard } from './guards/moderator.guard';
import { AdminGuard } from './guards/admin.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [LoggedInGuard]},
  { path: 'register', component: RegisterComponent, canActivate: [LoggedInGuard] },
  { path: '', redirectTo: 'announcements', pathMatch: 'full' },
  { path: 'user-edit', component: UserEditComponent, canActivate: [AuthorizeGuard]},
  { path: 'users', component: UsersListComponent, canActivate: [AdminGuard]},
  { path: 'announcements', component: AnnouncementsListComponent },
  { path: 'announcements/:id/details', component: AnnouncementDetailsComponent },
  { path: 'announcements-add', component: AnnouncementAddComponent , canActivate: [AuthorizeGuard]},
  { path: 'user-announcements', component: UserAnnouncementsListComponent , canActivate: [AuthorizeGuard]},
  { path: 'user-announcements/:id/edit', component: AnnouncementEditComponent , canActivate: [AuthorizeGuard]},
  { path: 'user-announcements/:id/details', component: AnnouncementDetailsComponent , canActivate: [AuthorizeGuard]},
  { path: 'announcements-for-approval', component: AnnouncementsListForApprovalComponent, canActivate: [ModeratorGuard]},
  { path: 'announcements-for-approval/:id/details', component: AnnouncementDetailsComponent, canActivate: [ModeratorGuard]},
  { path: 'not-found', component: NotFoundComponent},
  { path: 'server-error', component: ServerErrorComponent},
  { path: '**', component: NotFoundComponent, pathMatch: 'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
