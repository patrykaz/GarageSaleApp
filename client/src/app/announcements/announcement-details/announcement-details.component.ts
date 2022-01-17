import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AnnouncementService } from 'src/app/services/announcement.service';
import { NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { NgxGalleryImage } from '@kolkov/ngx-gallery';
import { NgxGalleryAnimation } from '@kolkov/ngx-gallery';
import { AnnouncementDetails } from 'src/app/models/announcementDetails';
import { AdminService } from 'src/app/services/admin.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'gs-announcement-details',
  templateUrl: './announcement-details.component.html',
  styleUrls: ['./announcement-details.component.css']
})
export class AnnouncementDetailsComponent implements OnInit {
  announcement: AnnouncementDetails;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];


  constructor(private announcementService: AnnouncementService,
      private activatedroute: ActivatedRoute,
      private cdr: ChangeDetectorRef,
      private adminService: AdminService,
      private router: Router,
      private toastr: ToastrService) {}

  ngOnInit(): void {
    this.loadAnnouncement();

    this.galleryOptions = [{
      width: '500px',
      height: '500px',
      imagePercent: 100,
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

  changeStatusAcceptedOfAnnouncement(announcement: AnnouncementDetails){
    if(confirm("Czy na pewno chcesz zaakceptować ogłoszenie?")){
      this.adminService.changeStatusAcceptedOfAnnouncement(announcement.id).subscribe(() => {
        this.toastr.success("Ogłoszenie zostało zaakceptowane")
        this.loadAnnouncement();
      });
    }
  }

  changeStatusActiveOfAnnouncement(announcement: AnnouncementDetails){
    if(confirm("Czy na pewno chcesz zmienić status ogłoszenia?")){
      this.announcementService.changeStatusActiveOfAnnouncement(announcement.id).subscribe(() => {
        this.toastr.success("Status ogłoszenia został zmieniony")
        this.loadAnnouncement();
      });
    }
  }

  deleteAnnouncement(announcement: AnnouncementDetails){
    if(confirm("Czy na pewno chcesz usunąć ogłoszenie?")){
      this.announcementService.deleteAnnouncement(announcement.id).subscribe(() => {
        this.router.navigateByUrl("/")
        this.toastr.success("Ogłoszenie zostało pomyślnie usunięte.")
      });
    }
  }
}
