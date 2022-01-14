import { NgModule } from '@angular/core';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserFormComponent } from './user-form/user-form.component';
import { SharedModule } from '../shared/shared.module';
import { CoreModule } from '../core/core.module';
import { UserCardComponent } from './user-card/user-card.component';
import { UsersListComponent } from './users-list/users-list.component';


@NgModule({
  imports: [
    SharedModule,
    CoreModule
  ],

  declarations: [
    UserEditComponent,
    UserFormComponent,
    UserCardComponent,
    UsersListComponent
  ],

  exports: [
    UserEditComponent,
    UserFormComponent,
    UserCardComponent,
    UsersListComponent
  ]
})
export class UsersModule { }
