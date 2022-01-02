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
import { AnnouncementAddComponent } from './announcement-add/announcement-add.component';
import { CoreModule } from '../core/core.module';
import { AnnouncementPhotosComponent } from './announcement-photos/announcement-photos.component';
import { FileUploadModule } from 'ng2-file-upload';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right'
    }),
    BrowserAnimationsModule,
    CoreModule,
    FileUploadModule
  ],

  declarations: [
    AnnouncementsComponent,
    AnnouncementCardComponent,
    AnnouncementAddComponent,
    AnnouncementPhotosComponent
  ],

  exports: [
    AnnouncementsComponent,
    AnnouncementCardComponent,
    AnnouncementAddComponent,
    AnnouncementPhotosComponent,
    FileUploadModule,
  ]

})
export class AnnouncementsModule { }
