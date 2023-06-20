import { Routes, RouterModule } from '@angular/router';
import { ManageCourseComponent } from './manage-course.component';
import { CourseDetailComponent } from './components/course/course-detail/course-detail.component';
import { CourseManageComponent } from './components/course-manage/course-manage.component';
import { ChapterDetailComponent } from './components/chapter/chapter-detail/chapter-detail.component';
import { LessonDetailComponent } from './components/lesson/lesson-detail/lesson-detail.component';
import { CourseRegisterComponent } from './components/course/course-register/course-register.component';
import { QuestionAddComponent } from './components/question/question-add/question-add.component';

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
        path: 'register',
        component: CourseRegisterComponent,
      },
      {
        path: 'detail/:id',
        component: CourseDetailComponent,
      },
      {
        path: 'chapter/:id',
        component: ChapterDetailComponent,
      },
      {
        path: 'lesson/:id',
        component: LessonDetailComponent,
      },
      {
        path: 'question-add',
        component: QuestionAddComponent,
      },
    ],
  },
];

export const ManageCourseRoutes = RouterModule.forChild(routes);
