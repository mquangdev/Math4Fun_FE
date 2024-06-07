import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { ProfileRoutes } from './profile.routing';
import { SharedModule } from 'src/app/shared/shared.module';
import { ViewComponent } from './components/view/view.component';
import { EditComponent } from './components/edit/edit.component';
import { EditMenuComponent } from './components/edit/edit-menu/edit-menu.component';
import { FindUserComponent } from './components/find-user/find-user.component';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { TabFriendsComponent } from './components/tab-friends/tab-friends.component';
import { DetailFriendComponent } from './components/detail-friend/detail-friend.component';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';

@NgModule({
  declarations: [
    ProfileComponent,
    ViewComponent,
    EditComponent,
    EditMenuComponent,
    FindUserComponent,
    TabFriendsComponent,
    DetailFriendComponent,
  ],
  imports: [
    CommonModule,
    ProfileRoutes,
    SharedModule,
    NzInputModule,
    NzButtonModule,
    NzIconModule,
    NzDropDownModule,
  ],
})
export class ProfileModule {}
