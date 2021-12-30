import { Component, Input, OnInit } from '@angular/core';
import { Announcement } from 'src/app/models/announcement';

@Component({
  selector: 'gs-announcement-card',
  templateUrl: './announcement-card.component.html',
  styleUrls: ['./announcement-card.component.css']
})
export class AnnouncementCardComponent implements OnInit {
  @Input() announcement: Announcement;

  constructor() { }

  ngOnInit(): void {
  }
}
