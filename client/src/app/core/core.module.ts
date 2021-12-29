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

  ],
  declarations: [
    NavComponent,
    LoginComponent,
    TextInputComponent,
    RegisterComponent,
    NotFoundComponent,
    ServerErrorComponent
  ],

  exports: [
    NavComponent,
    LoginComponent,
    TextInputComponent,
    RegisterComponent,
    ToastrModule,
    BrowserAnimationsModule,
    NotFoundComponent,
    ServerErrorComponent
  ]

})
export class CoreModule { }
