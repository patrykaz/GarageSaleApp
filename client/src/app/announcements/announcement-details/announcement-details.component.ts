import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Announcement } from 'src/app/models/announcement';
import { AnnouncementService } from 'src/app/services/announcement.service';
import { NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { NgxGalleryImage } from '@kolkov/ngx-gallery';
import { NgxGalleryAnimation } from '@kolkov/ngx-gallery';

@Component({
  selector: 'gs-announcement-details',
  templateUrl: './announcement-details.component.html',
  styleUrls: ['./announcement-details.component.css']
})
export class AnnouncementDetailsComponent implements OnInit {
  announcement: Announcement;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];


  constructor(private announcementService: AnnouncementService, private activatedroute: ActivatedRoute, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.loadAnnouncement();

    this.galleryOptions = [{
      width: '500px',
      height: '500px',
      imagePercent: 100,
      thumbnailsColumns: 5,
      imageAnimation: NgxGalleryAnimation.Slide,
      preview: true
    }]
  }

  ngAfterViewChecked(){

    this.cdr.detectChanges();
 }

  getImages(): NgxGalleryImage[] {
    const imageUrls = [];
    for (const photo of this.announcement.photos){
      imageUrls.push({
        small: photo?.url,
        medium: photo?.url,
        big: photo?.url
      })
    }
    return imageUrls;
  }


  loadAnnouncement(){
    const announcementId = this.activatedroute.snapshot.params['id'];
    this.announcementService.getAnnouncement(announcementId).subscribe(response => {
      this.announcement = response;
      this.galleryImages = this.getImages();
    })
  }
}
