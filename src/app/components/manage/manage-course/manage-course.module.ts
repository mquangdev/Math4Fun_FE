import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { ManageCourseRoutes } from './manage-course.routing';
import { ReuseableModule } from '../../reuseable/reuseable.module';
import { ManageCourseComponent } from './manage-course.component';
import { CourseAddComponent } from './components/course/course-add/course-add.component';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { CourseDetailComponent } from './components/course/course-detail/course-detail.component';
import { CourseManageComponent } from './components/course-manage/course-manage.component';
import { RouterModule } from '@angular/router';
import { ChapterAddComponent } from './components/chapter/chapter-add/chapter-add.component';
import { ChapterDetailComponent } from './components/chapter/chapter-detail/chapter-detail.component';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { LessonAddComponent } from './components/lesson/lesson-add/lesson-add.component';
import { LessonDetailComponent } from './components/lesson/lesson-detail/lesson-detail.component';
import { QuestionAddComponent } from './components/question/question-add/question-add.component';
import { QuestionDetailComponent } from './components/question/question-detail/question-detail.component';
import { CourseRegisterComponent } from './components/course/course-register/course-register.component';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { LearnModule } from '../../learn/learn.module';
import { QuestionAddAiComponent } from './components/question/question-add-ai/question-add-ai.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
@NgModule({
  declarations: [
    ManageCourseComponent,
    CourseAddComponent,
    CourseDetailComponent,
    CourseManageComponent,
    ChapterAddComponent,
    ChapterDetailComponent,
    LessonAddComponent,
    LessonDetailComponent,
    QuestionAddComponent,
    QuestionDetailComponent,
    CourseRegisterComponent,
    QuestionAddAiComponent,
  ],
  imports: [
    CommonModule,
    ManageCourseRoutes,
    SharedModule,
    ReuseableModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzModalModule,
    NzUploadModule,
    NzSelectModule,
    NzRadioModule,
    NzIconModule,
    RouterModule,
  ],
})
export class ManageCourseModule {}
