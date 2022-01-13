import { Component, Input, OnInit } from '@angular/core';
import { AnnouncementCard } from 'src/app/models/announcementCard';


@Component({
  selector: 'gs-announcement-card',
  templateUrl: './announcement-card.component.html',
  styleUrls: ['./announcement-card.component.css']
})
export class AnnouncementCardComponent implements OnInit {
  @Input() announcement: AnnouncementCard;

  constructor() {}

  ngOnInit(): void {
  }
}
