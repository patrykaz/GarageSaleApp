import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnnouncementAddComponent } from './announcements/announcement-add/announcement-add.component';
import { AnnouncementDetailsComponent } from './announcements/announcement-details/announcement-details.component';
import { AnnouncementEditComponent } from './announcements/announcement-edit/announcement-edit.component';
import { AnnouncementsComponent } from './announcements/announcements.component';
import { UserAnnouncementsComponent } from './announcements/user-announcements/user-announcements.component';
import { NotFoundComponent } from './core/errors/not-found/not-found.component';
import { ServerErrorComponent } from './core/errors/server-error/server-error.component';
import { LoginComponent } from './core/login/login.component';
import { RegisterComponent } from './core/register/register.component';
import { AuthorizeGuard } from './guards/authorize.guard';
import { LoggedInGuard } from './guards/logged-in.guard';
import { UserEditComponent } from './users/user-edit/user-edit.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [LoggedInGuard]},
  { path: 'register', component: RegisterComponent, canActivate: [LoggedInGuard] },
  { path: '', redirectTo: 'announcements', pathMatch: 'full' },
  { path: 'user-edit', component: UserEditComponent, canActivate: [AuthorizeGuard]},
  { path: 'announcements', component: AnnouncementsComponent },
  { path: 'announcements-add', component: AnnouncementAddComponent , canActivate: [AuthorizeGuard]},
  { path: 'user-announcements', component: UserAnnouncementsComponent , canActivate: [AuthorizeGuard]},
  { path: 'user-announcements/:id/edit', component: AnnouncementEditComponent , canActivate: [AuthorizeGuard]},
  { path: 'user-announcements/:id/details', component: AnnouncementDetailsComponent , canActivate: [AuthorizeGuard]},
  { path: 'announcements/:id/details', component: AnnouncementDetailsComponent },
  { path: 'not-found', component: NotFoundComponent},
  { path: 'server-error', component: ServerErrorComponent},
  { path: '**', component: NotFoundComponent, pathMatch: 'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
