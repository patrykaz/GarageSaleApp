import { Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';

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

  constructor(private accountService: AccountService, private fb: FormBuilder, private router: Router) { }

  settings = {
    bigBanner: true,
    timePicker: false,
    format: 'dd-MM-yyyy',
    defaultOpen: true
  }

  ngOnInit(): void {
    this.initializeForm();
    this.minDate = new Date();
  }

  //reaktywny formularz z walidacja
  initializeForm(){
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      startDate: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      gender: ['male'],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(50)]],
      confirmPassword: ['', [Validators.required, this.matchValues('password')]]
    })
    // sprawdzenie czy hasło zostało zmienione, i aktualizuje pole powtórz hasło
    this.registerForm.controls['password'].valueChanges.subscribe(() => {
      this.registerForm.controls['confirmPassword'].updateValueAndValidity();
    })
  }

  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      return control?.value === control?.parent?.controls[matchTo].value ? null : {isMatching: true}
    }
  }

  register(){
    this.accountService.register(this.registerForm.value).subscribe(() => {
      this.router.navigateByUrl('');
    });
  }
}
