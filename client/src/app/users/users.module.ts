import { NgModule } from '@angular/core';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserFormComponent } from './user-form/user-form.component';
import { SharedModule } from '../shared/shared.module';
import { CoreModule } from '../core/core.module';
import { UsersListComponent } from './users-list/users-list.component';
import { UserCardComponent } from './user-card/user-card.component';


@NgModule({
  imports: [
    SharedModule,
    CoreModule
  ],

  declarations: [
    UserEditComponent,
    UserFormComponent,
    UsersListComponent,
    UserCardComponent
  ],

  exports: [
    UserEditComponent,
    UserFormComponent,
    UsersListComponent,
    UserCardComponent
  ]
})
export class UsersModule { }
