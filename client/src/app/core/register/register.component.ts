import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'gs-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  address: FormGroup;
  validationErrors: string[] = [];
  maxDate: Date;
  setUserAddress = false;

  constructor(private accountService: AccountService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.setMaxDate();
    this.initializeForm();
  }

  //reaktywny formularz z walidacja
  initializeForm(){
    this.registerForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(50)]],
      firstName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      gender: ['male'],
      dateOfBirth: [null],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(50)]],
      confirmPassword: ['', [Validators.required, this.matchValues('password')]]
    })
    // sprawdzenie czy hasło zostało zmienione, i aktualizuje pole powtórz hasło
    this.registerForm.controls['password'].valueChanges.subscribe(() => {
      this.registerForm.controls['confirmPassword'].updateValueAndValidity();
    })


    this.address = this.fb.group({
      street: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      city: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      province: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]]
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

  setMaxDate(){
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18)
  }

  setAddress(){
    this.setUserAddress = true;
    this.registerForm.addControl('address', this.address);
    this.registerForm.updateValueAndValidity();
  }

  unsetAddress(){
    this.setUserAddress = false;
    this.registerForm.removeControl('address')
    this.registerForm.updateValueAndValidity();
  }
}
