import { Routes, RouterModule } from '@angular/router';
import { ManageUsersComponent } from './manage-users.component';
import { ListUsersComponent } from './components/list-users/list-users.component';

const routes: Routes = [
  {
    path: '',
    component: ManageUsersComponent,
    children: [
      {
        path: '',
        component: ListUsersComponent,
      },
    ],
  },
];

export const ManageUsersRoutes = RouterModule.forChild(routes);
