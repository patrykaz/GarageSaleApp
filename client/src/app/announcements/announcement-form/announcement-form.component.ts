
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AnnouncementDetails } from 'src/app/models/announcementDetails';
import { Member } from 'src/app/models/member';
import { AnnouncementService } from 'src/app/services/announcement.service';

@Component({
  selector: 'gs-announcement-form',
  templateUrl: './announcement-form.component.html',
  styleUrls: ['./announcement-form.component.css']
})
export class AnnouncementFormComponent implements OnInit {
  @Input() announcement: AnnouncementDetails;
  @Input() userOfAccount: Member;
  @ViewChild('picker') picker: any;

  announcementForm: FormGroup;
  minDate: Date;
  validationErrors: string[] = [];

  btnSubmitText = "Zapisz";

  constructor(
    private announcementService: AnnouncementService,
    private fb: FormBuilder,
    private toastr: ToastrService) {}

  ngOnInit(): void {
    this.initializeForm();
    this.minDate = new Date();
  }

  //reaktywny formularz z walidacja
  initializeForm(){
    if(this.announcement){
      this.btnSubmitText = "Aktualizuj";

      this.announcementForm = this.fb.group({
        name: [this.announcement.name, [Validators.required, Validators.minLength(6), Validators.maxLength(100)]],
        description: [this.announcement.description, [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]],
        startDate: [this.announcement.startDate, [Validators.required]],
        duration: [this.announcement.duration, [Validators.required, Validators.min(1), Validators.max(12)]],
        address: this.fb.group({
          street: [this.announcement.address.street, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
          city: [this.announcement.address.city, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
          province: [this.announcement.address.province, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]]
        })
      })
    }
    else{
      this.btnSubmitText = "Zapisz";

      this.announcementForm = this.fb.group({
        name: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(100)]],
        description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]],
        startDate: ['', [Validators.required]],
        duration: ['', [Validators.required, Validators.min(1), Validators.max(12)]],
        address: this.fb.group({
          street: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
          city: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
          province: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]]
        })
      })
    }
  }

  setEmptyAddress(){
    this.announcementForm.get(['address','street']).setValue('');
    this.announcementForm.get(['address','city']).setValue('');
    this.announcementForm.get(['address','province']).setValue('');
  }

  setUserAddress(){
    this.announcementForm.get(['address','street']).setValue(this.userOfAccount.address.street);
    this.announcementForm.get(['address','city']).setValue(this.userOfAccount.address.city);
    this.announcementForm.get(['address','province']).setValue(this.userOfAccount.address.province);
  }

  saveAnnouncement(){
    if(this.announcement == null){
      this.announcementService.addAnnouncement(this.announcementForm.value).subscribe(response => {
        this.announcement = response;
        this.initializeForm();
        this.btnSubmitText = "Aktualizuj";
        this.toastr.success("Ogłoszenie zostało pomyślnie zapisane");
      });
    }
    else{
      this.announcementService.updateAnnouncement(this.announcement.id, this.announcementForm.value).subscribe(response => {
        this.announcement = response;
        this.initializeForm();
        this.toastr.success("Ogłoszenie zostało pomyślnie zaktualizowane");
      });
    }
  }
}
