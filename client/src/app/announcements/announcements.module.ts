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
import { TextInputComponent } from '../core/forms/text-input/text-input.component';
import { CoreModule } from '../core/core.module';



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
    CoreModule
  ],

  declarations: [
    AnnouncementsComponent,
    AnnouncementCardComponent,
    AnnouncementAddComponent
  ],

  exports: [
    AnnouncementsComponent,
    AnnouncementCardComponent,
    AnnouncementAddComponent,
  ]

})
export class AnnouncementsModule { }
