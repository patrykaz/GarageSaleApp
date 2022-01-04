import { Time } from '@angular/common';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Announcement } from 'src/app/models/announcement';
import { AccountService } from 'src/app/services/account.service';
import { AnnouncementService } from 'src/app/services/announcement.service';

@Component({
  selector: 'gs-announcement-form',
  templateUrl: './announcement-form.component.html',
  styleUrls: ['./announcement-form.component.css']
})
export class AnnouncementFormComponent implements OnInit {
  @Input() announcement: Announcement;
  registerForm: FormGroup;
  minDate: Date;
  myDate: Date;
  validationErrors: string[] = [];

  btnSubmitText = "Zapisz";

  @ViewChild('picker') picker: any;

  constructor(
    private accountService: AccountService,
    private announcementService: AnnouncementService,
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.initializeForm();
    this.minDate = new Date();
  }

  //reaktywny formularz z walidacja
  initializeForm(){
    if(this.announcement){
      this.btnSubmitText = "Aktualizuj";

      this.registerForm = this.fb.group({
        name: [this.announcement.name, [Validators.required, Validators.minLength(6), Validators.maxLength(50)]],
        description: [this.announcement.description, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
        startDate: [this.announcement.startDate, [Validators.required]],
        duration: [this.announcement.duration, [Validators.required, Validators.min(1), Validators.max(12)]],
        address: this.fb.group({
          street: [this.announcement.address.street, [Validators.required, Validators.minLength(6), Validators.maxLength(50)]],
          city: [this.announcement.address.city, [Validators.required, Validators.minLength(6), Validators.maxLength(50)]],
          postalCode: [this.announcement.address.postalCode, [Validators.required, Validators.minLength(6), Validators.maxLength(50)]]
        })
      })
    }
    else{
      this.btnSubmitText = "Zapisz";

      this.registerForm = this.fb.group({
        name: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(50)]],
        description: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
        startDate: ['', [Validators.required]],
        duration: ['', [Validators.required, Validators.min(1), Validators.max(12)]],
        address: this.fb.group({
          street: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(50)]],
          city: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(50)]],
          postalCode: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(50)]]
        })
      })
    }
  }

  setEmptyAddress(){
    this.registerForm.get(['address','street']).setValue('');
    this.registerForm.get(['address','city']).setValue('');
    this.registerForm.get(['address','postalCode']).setValue('');
  }

  setUserAddress(){
    this.registerForm.get(['address','street']).setValue('Dane użytkownika');
    this.registerForm.get(['address','city']).setValue('Dane użytkownika');
    this.registerForm.get(['address','postalCode']).setValue('Dane użytkownika');
  }

  saveAnnouncement(){
    if(this.announcement == null){
      this.announcementService.addAnnouncement(this.registerForm.value).subscribe(response => {
        this.announcement = response;
        this.initializeForm();
        this.btnSubmitText = "Aktualizuj";
        this.toastr.success("Ogłoszenie zostało pomyślnie zapisane");
      });
    }
    else{
      this.announcementService.updateAnnouncement(this.announcement.id, this.registerForm.value).subscribe(response => {
        this.announcement = response;
        this.initializeForm();
        this.toastr.success("Ogłoszenie zostało pomyślnie zaktualizowane");
      });
    }
  }
}
