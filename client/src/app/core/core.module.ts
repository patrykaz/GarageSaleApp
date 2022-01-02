import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { NavComponent } from './nav/nav.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { TextInputComponent } from './forms/text-input/text-input.component';
import { RegisterComponent } from './register/register.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { FooterComponent } from './footer/footer.component';
import { TextInputAreaComponent } from './forms/text-input-area/text-input-area.component';
import { DatePickerComponent } from './forms/date-picker/date-picker.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';


import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';

import {
  NgxMatDatetimePickerModule,
  NgxMatNativeDateModule,
  NgxMatTimepickerModule
} from '@angular-material-components/datetime-picker';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right'
    }),
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
    TimepickerModule.forRoot(),

    MatDatepickerModule,
    MatInputModule,

    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule
  ],

  declarations: [
    NavComponent,
    LoginComponent,
    TextInputComponent,
    RegisterComponent,
    NotFoundComponent,
    ServerErrorComponent,
    FooterComponent,
    TextInputAreaComponent,
    DatePickerComponent,
  ],

  exports: [
    NavComponent,
    LoginComponent,
    TextInputComponent,
    RegisterComponent,
    ToastrModule,
    BrowserAnimationsModule,
    NotFoundComponent,
    ServerErrorComponent,
    FooterComponent,
    TextInputAreaComponent,
    DatePickerComponent,
    TimepickerModule,
    BsDatepickerModule,
    TimepickerModule,

    MatDatepickerModule,
    MatInputModule,

    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule
  ]

})
export class CoreModule { }
