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

const routes: Routes = [
  // { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', redirectTo: 'announcements', pathMatch: 'full' },
  { path: 'announcements', component: AnnouncementsComponent },
  { path: 'announcements-add', component: AnnouncementAddComponent },
  { path: 'user-announcements', component: UserAnnouncementsComponent },
  { path: 'user-announcements/:id/edit', component: AnnouncementEditComponent },
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
