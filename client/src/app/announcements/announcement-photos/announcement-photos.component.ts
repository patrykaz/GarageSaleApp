import { Component, Input, OnInit} from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { Photo } from 'src/app/models/announcement';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'gs-announcement-photos',
  templateUrl: './announcement-photos.component.html',
  styleUrls: ['./announcement-photos.component.css']
})
export class AnnouncementPhotosComponent implements OnInit {
  uploader: FileUploader;
  hasBaseDropZoneOver = false;
  baseUrl = environment.apiUrl;

  constructor() {}

  ngOnInit(): void {
    this.initalizeUploader();
  }

  fileOverBase(e: any){
    this.hasBaseDropZoneOver = e;
  }

  initalizeUploader() {
    this.uploader = new FileUploader({
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
        const photo: Photo = JSON.parse(response);
      }
    }
  }
}
