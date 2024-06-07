import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { ViewComponent } from './components/view/view.component';
import { EditComponent } from './components/edit/edit.component';
import { FindUserComponent } from './components/find-user/find-user.component';
import { DetailFriendComponent } from './components/detail-friend/detail-friend.component';

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    children: [
      {
        path: '',
        component: ViewComponent,
      },
      {
        path: 'edit',
        loadChildren: () =>
          import('./components/edit/edit.module').then((m) => m.EditModule),
      },
      {
        path: 'find-user',
        component: FindUserComponent,
      },
      {
        path: 'detail-user/:id',
        component: DetailFriendComponent,
      },
    ],
  },
];

export const ProfileRoutes = RouterModule.forChild(routes);
