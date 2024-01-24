import { EditComponent } from './edit.component';
import { Routes, RouterModule } from '@angular/router';
import { EditAccountComponent } from './edit-account/edit-account.component';
import { EditCourseComponent } from './edit-course/edit-course.component';
import { EditPasswordComponent } from './edit-password/edit-password.component';

const routes: Routes = [
  {
    path: '',
    component: EditComponent,
    children: [
      {
        path: 'account',
        component: EditAccountComponent,
      },
      {
        path: 'course',
        component: EditCourseComponent,
      },
      {
        path: 'password',
        component: EditPasswordComponent,
      },
    ],
  },
];
export const EditRoutes = RouterModule.forChild(routes);
