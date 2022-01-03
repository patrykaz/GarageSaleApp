import { Component, Input, OnInit} from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { Toast, ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { Announcement, Photo } from 'src/app/models/announcement';
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
  @Input() announcement: Announcement;

  uploader: FileUploader;
  baseUrl = environment.apiUrl;
  user: User;
  fileInput = false;


  constructor(private accountService: AccountService, private announcementService: AnnouncementService, private toastr: ToastrService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe( user => this.user = user)
  }

  ngOnInit(): void {
    this.initalizeUploader();
    console.log(this.announcement);
  }

  ngOnChanges(){
    this.changeInputFile(); // sprawdza czy ogłoszenie zostało dodane aby móc dodać zdjęcia do ogłoszenia
    this.initalizeUploader();
  }

  // setMainPhoto(photo: Photo){
  //   this.announcement.setMainPhoto(photo.id).subscribe(() => {
  //     this.user.photoUrl = photo.url;
  //     this.accountService.setCurrentUser(this.user);
  //     this.member.photoUrl = photo.url;
  //     this.member.photos.forEach(p => {
  //       if (p.isMain) p.isMain = false;
  //       if (p.id === photo.id) p.isMain = true;
  //     })
  //   });
  // }

  deletePhoto(photoId: number){
    this.announcementService.deletePhoto(this.announcement.id, photoId).subscribe(() => {
      this.announcement.photos = this.announcement.photos.filter(x => x.id !== photoId);
    })
  }

  initalizeUploader() {
    //this.changeInputFile();
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
    if(this.fileInput == true){
      this.toastr.error("Zapisz formularz, jeśli chcesz dodać zdjęcia");
    }
  }

}
