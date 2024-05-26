import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageUsersComponent } from './manage-users.component';
import { ManageUsersRoutes } from './manage-users.routing';
import { ListUsersComponent } from './components/list-users/list-users.component';

@NgModule({
  declarations: [ManageUsersComponent, ListUsersComponent],
  imports: [CommonModule, ManageUsersRoutes],
})
export class ManageUsersModule {}
