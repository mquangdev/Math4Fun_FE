import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { ViewComponent } from './components/view/view.component';

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    children: [
      {
        path: '',
        component: ViewComponent,
      },
    ],
  },
];

export const ProfileRoutes = RouterModule.forChild(routes);
