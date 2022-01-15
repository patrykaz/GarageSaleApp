import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { UsersListComponent } from './users-list/users-list.component';
import { UserCardComponent } from './user-card/user-card.component';
import { AnnouncementsListForApprovalComponent } from './announcements-list-for-approval/announcements-list-for-approval.component';
import { AnnouncementsModule } from '../announcements/announcements.module';
import { AnnouncementAdminCardComponent } from './announcement-admin-card/announcement-admin-card.component';



@NgModule({
  declarations: [
    UsersListComponent,
    UserCardComponent,
    AnnouncementsListForApprovalComponent,
    AnnouncementAdminCardComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    SharedModule,
  ],
  exports: [
    UsersListComponent,
    UserCardComponent,
    AnnouncementsListForApprovalComponent,
    AnnouncementAdminCardComponent
  ]

})
export class AdminPanelModule { }
