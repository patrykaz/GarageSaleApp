import { Component, Input, OnInit} from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { AnnouncementDetails } from 'src/app/models/announcementDetails';
import { Photo } from 'src/app/models/photo';
import { User } from 'src/app/models/user';
import { AccountService } from 'src/app/services/account.service';
import { AnnouncementService } from 'src/app/services/announcement.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'gs-announcement-photos',
  templateUrl: './announcement-photos.component.html',
  styleUrls: ['./announcement-photos.component.css']
})
export class AnnouncementPhotosComponent implements OnInit {
  @Input() announcement: AnnouncementDetails;

  uploader: FileUploader;
  baseUrl = environment.apiUrl;
  user: User;
  fileInput = false;
  maxPhotos = 6;

  constructor(private accountService: AccountService, private announcementService: AnnouncementService, private toastr: ToastrService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe( user => this.user = user)
  }

  ngOnInit(): void {
    this.initalizeUploader();
  }

  ngOnChanges(){
    this.changeInputFile(); // sprawdza czy ogłoszenie zostało dodane aby móc dodać zdjęcia do ogłoszenia
    this.initalizeUploader();
  }

  setMainPhoto(photo: Photo){
    this.announcementService.setMainPhoto(this.announcement.id, photo.id).subscribe(() => {
      this.announcement.photoUrl = photo.url;
      this.announcement.photos.forEach(p => {
        if (p.isMain) p.isMain = false;
        if (p.id === photo.id) p.isMain = true;
      })
    });
  }

  deletePhoto(photoId: number){
    if(confirm("Czy na pewno chcesz usunąć to zdjęcie?")){
      this.announcementService.deletePhoto(this.announcement.id, photoId).subscribe(() => {
        let refreshedAnnouncement = this.announcementService.getAnnouncement(this.announcement.id)
        refreshedAnnouncement.subscribe(response => {
          this.announcement.photos = response.photos
        })
      })
    }
  }

  initalizeUploader() {
    this.uploader = new FileUploader({
      url: this.baseUrl + 'Announcements/' + this.announcement?.id + '/add-photo',
      authToken: 'Bearer ' + this.user.token,
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024
    });

    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    }

    this.uploader.onSuccessItem = (item, response, status , headers) => {
      if (response) {
        this.announcement = JSON.parse(response);
      }
    }
  }

  changeInputFile(){
    if(this.announcement == null){
      this.fileInput = true;
    }
    else{
      this.fileInput = false;
    }
  }

  firstSaveForm(){
    if(this.maxPhotos == this.uploader?.queue?.length + this.announcement?.photos?.length){
      this.fileInput = true;
      this.toastr.error("Maksymalnie można dodać 6 zdjęć");
    }
    else if(this.maxPhotos > this.uploader?.queue?.length + this.announcement?.photos?.length){
      this.fileInput = false;
    }
    else if(this.fileInput == true){
      this.toastr.error("Zapisz formularz, jeśli chcesz dodać zdjęcia");
    }
  }

  showPhoto(photoUrl: string){
    window.open(photoUrl);
  }

}
