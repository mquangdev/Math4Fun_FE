import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main.component';
import { checkLoginGuard } from 'src/app/guard/checkLoginGuard';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'learn',
        loadChildren: () =>
          import('./../learn/learn.module').then((m) => m.LearnModule),
      },
    ],
  },
];

export const MainRoutes = RouterModule.forChild(routes);
