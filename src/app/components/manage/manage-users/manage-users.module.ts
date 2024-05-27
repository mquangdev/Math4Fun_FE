import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTableModule } from 'ng-zorro-antd/table';
import { SharedModule } from 'src/app/shared/shared.module';
import { ListUsersComponent } from './components/list-users/list-users.component';
import { ManageUsersComponent } from './manage-users.component';
import { ManageUsersRoutes } from './manage-users.routing';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzButtonModule } from 'ng-zorro-antd/button';
@NgModule({
  declarations: [ManageUsersComponent, ListUsersComponent],
  imports: [
    CommonModule,
    ManageUsersRoutes,
    SharedModule,
    NzInputModule,
    NzIconModule,
    NzTableModule,
    NzButtonModule,
    NzDropDownModule,
  ],
})
export class ManageUsersModule {}
