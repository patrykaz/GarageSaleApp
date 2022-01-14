import { NgModule } from '@angular/core';
import { AnnouncementCardComponent } from './announcement-card/announcement-card.component';
import { CoreModule } from '../core/core.module';
import { AnnouncementPhotosComponent } from './announcement-photos/announcement-photos.component';
import { AnnouncementAddComponent } from './announcement-add/announcement-add.component';
import { AnnouncementFormComponent } from './announcement-form/announcement-form.component';
import { AnnouncementEditComponent } from './announcement-edit/announcement-edit.component';
import { UserAnnouncementsListComponent } from './user-announcements-list/user-announcements-list.component';
import { AnnouncementManageCardComponent } from './announcement-manage-card/announcement-manage-card.component';
import { AnnouncementDetailsComponent } from './announcement-details/announcement-details.component';
import { AnnouncementCommentsComponent } from './announcement-comments/announcement-comments.component';
import { SharedModule } from '../shared/shared.module';
import { AnnouncementsListComponent } from './announcements-list/announcements-list.component';

@NgModule({
  imports: [
    SharedModule,
    CoreModule,
  ],

  declarations: [
    AnnouncementsListComponent,
    AnnouncementCardComponent,
    AnnouncementPhotosComponent,
    AnnouncementFormComponent,
    AnnouncementAddComponent,
    AnnouncementEditComponent,
    UserAnnouncementsListComponent,
    AnnouncementManageCardComponent,
    AnnouncementDetailsComponent,
    AnnouncementCommentsComponent,
  ],

  exports: [
    AnnouncementsListComponent,
    AnnouncementCardComponent,
    AnnouncementPhotosComponent,
    AnnouncementFormComponent,
    AnnouncementAddComponent,
    AnnouncementEditComponent,
    UserAnnouncementsListComponent,
    AnnouncementManageCardComponent,
    AnnouncementDetailsComponent,
    AnnouncementCommentsComponent,
  ]

})
export class AnnouncementsModule { }
