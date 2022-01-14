import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { NavComponent } from './nav/nav.component';
import { TextInputComponent } from './forms/text-input/text-input.component';
import { RegisterComponent } from './register/register.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { FooterComponent } from './footer/footer.component';
import { TextInputAreaComponent } from './forms/text-input-area/text-input-area.component';
import { DatePickerComponent } from './forms/date-picker/date-picker.component';
import { SharedModule } from '../shared/shared.module';
import { HasRoleDirective } from './directives/hasRole.directive';

@NgModule({
  imports: [
    SharedModule,
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
    HasRoleDirective
  ],

  exports: [
    NavComponent,
    LoginComponent,
    TextInputComponent,
    RegisterComponent,
    NotFoundComponent,
    ServerErrorComponent,
    FooterComponent,
    TextInputAreaComponent,
    DatePickerComponent,
    HasRoleDirective
  ]

})
export class CoreModule { }
