import { Component, Input, OnInit } from '@angular/core';
import { Announcement } from 'src/app/models/announcement';

@Component({
  selector: 'gs-announcement-manage-card',
  templateUrl: './announcement-manage-card.component.html',
  styleUrls: ['./announcement-manage-card.component.css']
})
export class AnnouncementManageCardComponent implements OnInit {
  @Input() announcement: Announcement;

  constructor() { }

  ngOnInit(): void {
  }

}
