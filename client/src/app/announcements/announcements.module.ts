import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnnouncementsComponent } from './announcements.component';
import { AnnouncementCardComponent } from './announcement-card/announcement-card.component';

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CoreModule } from '../core/core.module';
import { AnnouncementPhotosComponent } from './announcement-photos/announcement-photos.component';
import { FileUploadModule } from 'ng2-file-upload';
import { AnnouncementAddComponent } from './announcement-add/announcement-add.component';
import { AnnouncementFormComponent } from './announcement-form/announcement-form.component';
import { AnnouncementEditComponent } from './announcement-edit/announcement-edit.component';
import { UserAnnouncementsComponent } from './user-announcements/user-announcements.component';
import { AnnouncementManageCardComponent } from './announcement-manage-card/announcement-manage-card.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { AnnouncementDetailsComponent } from './announcement-details/announcement-details.component';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { AnnouncementCommentsComponent } from './announcement-comments/announcement-comments.component';
import { TimeagoModule } from 'ngx-timeago';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    CoreModule,
  ],

  declarations: [
    AnnouncementsComponent,
    AnnouncementCardComponent,
    AnnouncementPhotosComponent,
    AnnouncementFormComponent,
    AnnouncementAddComponent,
    AnnouncementEditComponent,
    UserAnnouncementsComponent,
    AnnouncementManageCardComponent,
    AnnouncementDetailsComponent,
    AnnouncementCommentsComponent,
  ],

  exports: [
    AnnouncementsComponent,
    AnnouncementCardComponent,
    AnnouncementPhotosComponent,
    AnnouncementFormComponent,
    AnnouncementAddComponent,
    AnnouncementEditComponent,
    UserAnnouncementsComponent,
    AnnouncementManageCardComponent,
    AnnouncementDetailsComponent,
    AnnouncementCommentsComponent,
  ]

})
export class AnnouncementsModule { }
