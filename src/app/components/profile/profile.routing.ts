import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { ViewComponent } from './components/view/view.component';
import { EditComponent } from './components/edit/edit.component';

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
    ],
  },
];

export const ProfileRoutes = RouterModule.forChild(routes);
