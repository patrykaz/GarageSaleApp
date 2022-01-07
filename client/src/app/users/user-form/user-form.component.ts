import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { Member } from 'src/app/models/member';
import { AccountService } from 'src/app/services/account.service';
import { MemberService } from 'src/app/services/member.service';

@Component({
  selector: 'gs-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  @Input() member: Member
  userForm: FormGroup;
  address: FormGroup;
  validationErrors: string[] = [];
  maxDate: Date;
  setUserAddress = false;
  radioButton = false;

  constructor(private memberService: MemberService, private fb: FormBuilder, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.setMaxDate();
    this.initializeForm();
    if(this.member.address != null){
      this.radioButton = true;
      this.setAddress();
    }
  }

  //reaktywny formularz z walidacja
  initializeForm(){
    this.userForm = this.fb.group({
      firstName: [this.member.firstName, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      lastName: [this.member.lastName, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      gender: [this.member.gender],
      dateOfBirth: [this.member?.dateOfBirth]
    })

    this.address = this.fb.group({
      street: [this.member.address?.street, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      city: [this.member.address?.city, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      province: [this.member.address?.province, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]]
    })
  }

  update(){
    this.memberService.updateUserAccount(this.userForm.value).subscribe(user => {
      this.member = user;
      this.toastr.success("Profil został pomyślnie zaktualizowany")
    });
  }

  setMaxDate(){
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18)
  }

  setAddress(){
    this.setUserAddress = true;
    this.userForm.addControl('address', this.address);
    this.userForm.updateValueAndValidity();
  }

  unsetAddress(){
    this.setUserAddress = false;
    this.userForm.removeControl('address')
    this.userForm.updateValueAndValidity();
  }
}

