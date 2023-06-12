import { Routes, RouterModule } from '@angular/router';
import { ManageCourseComponent } from './manage-course.component';
import { CourseDetailComponent } from './components/course-detail/course-detail.component';
import { CourseManageComponent } from './components/course-manage/course-manage.component';

const routes: Routes = [
  {
    path: '',
    component: ManageCourseComponent,
    children: [
      {
        path: '',
        component: CourseManageComponent,
      },
      {
        path: 'detail/:id',
        component: CourseDetailComponent,
      },
    ],
  },
];

export const ManageCourseRoutes = RouterModule.forChild(routes);
