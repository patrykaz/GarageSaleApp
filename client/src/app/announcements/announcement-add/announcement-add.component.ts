import { Time } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { AnnouncementService } from 'src/app/services/announcement.service';

@Component({
  selector: 'gs-announcement-add',
  templateUrl: './announcement-add.component.html',
  styleUrls: ['./announcement-add.component.css']
})
export class AnnouncementAddComponent implements OnInit {
  registerForm: FormGroup;
  minDate: Date;
  myDate: Date;
  validationErrors: string[] = [];



  @ViewChild('picker') picker: any;

  constructor(private accountService: AccountService, private announcementService: AnnouncementService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.initializeForm();
    this.minDate = new Date();
  }

  //reaktywny formularz z walidacja
  initializeForm(){
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

  addAnnouncement(){
    this.announcementService.addAnnouncement(this.registerForm.value).subscribe(() => {
      this.router.navigateByUrl('');
    });
  }
}
