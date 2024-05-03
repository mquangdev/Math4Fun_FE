import { Routes, RouterModule } from '@angular/router';
import { ManageCourseComponent } from './manage-course.component';
import { CourseDetailComponent } from './components/course/course-detail/course-detail.component';
import { CourseManageComponent } from './components/course-manage/course-manage.component';
import { ChapterDetailComponent } from './components/chapter/chapter-detail/chapter-detail.component';
import { LessonDetailComponent } from './components/lesson/lesson-detail/lesson-detail.component';
import { CourseRegisterComponent } from './components/course/course-register/course-register.component';
import { QuestionAddComponent } from './components/question/question-add/question-add.component';
import { QuestionDetailComponent } from './components/question/question-detail/question-detail.component';
import { QuestionAddAiComponent } from './components/question/question-add-ai/question-add-ai.component';

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
      {
        path: 'question-add-ai',
        component: QuestionAddAiComponent,
      },
      {
        path: 'question/:id',
        component: QuestionDetailComponent,
      },
    ],
  },
];

export const ManageCourseRoutes = RouterModule.forChild(routes);
