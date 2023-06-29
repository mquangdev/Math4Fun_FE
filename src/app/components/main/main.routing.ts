import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main.component';
import { checkLoginGuard } from 'src/app/guard/checkLoginGuard';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        redirectTo: 'learn',
        pathMatch: 'full',
      },
      {
        path: 'learn',
        loadChildren: () =>
          import('./../learn/learn.module').then((m) => m.LearnModule),
      },
      {
        path: 'manage',
        loadChildren: () =>
          import('./../manage/manage.module').then((m) => m.ManageModule),
      },
      {
        path: 'shop',
        loadChildren: () =>
          import('./../shop/shop.module').then((m) => m.ShopModule),
      },
      {
        path: 'manage-course',
        loadChildren: () =>
          import('./../manage/manage-course/manage-course.module').then(
            (m) => m.ManageCourseModule
          ),
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('./../profile/profile.module').then((m) => m.ProfileModule),
      },
    ],
  },
];

export const MainRoutes = RouterModule.forChild(routes);
