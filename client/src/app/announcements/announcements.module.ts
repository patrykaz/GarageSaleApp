import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnnouncementsComponent } from './announcements.component';
import { AnnouncementCardComponent } from './announcement-card/announcement-card.component';


@NgModule({
  imports: [
    CommonModule
  ],

  declarations: [
    AnnouncementsComponent,
    AnnouncementCardComponent
  ],

  exports: [
    AnnouncementsComponent,
    AnnouncementCardComponent
  ]

})
export class AnnouncementsModule { }
