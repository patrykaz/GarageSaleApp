import { NgModule } from '@angular/core';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserFormComponent } from './user-form/user-form.component';
import { SharedModule } from '../shared/shared.module';
import { CoreModule } from '../core/core.module';
import { UserCardComponent } from '../admin-panel/user-card/user-card.component';
import { UsersListComponent } from '../admin-panel/users-list/users-list.component';


@NgModule({
  imports: [
    SharedModule,
    CoreModule
  ],

  declarations: [
    UserEditComponent,
    UserFormComponent,
  ],

  exports: [
    UserEditComponent,
    UserFormComponent,
  ]
})
export class UsersModule { }
