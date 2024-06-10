import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { SharedModule } from 'src/app/shared/shared.module';
import { ChapterAddComponent } from './components/chapter/chapter-add/chapter-add.component';
import { ChapterDetailComponent } from './components/chapter/chapter-detail/chapter-detail.component';
import { CourseManageComponent } from './components/course-manage/course-manage.component';
import { CourseAddComponent } from './components/course/course-add/course-add.component';
import { CourseDetailComponent } from './components/course/course-detail/course-detail.component';
import { CourseRegisterComponent } from './components/course/course-register/course-register.component';
import { LessonAddComponent } from './components/lesson/lesson-add/lesson-add.component';
import { LessonDetailComponent } from './components/lesson/lesson-detail/lesson-detail.component';
import { QuestionAddAiComponent } from './components/question/question-add-ai/question-add-ai.component';
import { QuestionAddComponent } from './components/question/question-add/question-add.component';
import { QuestionDetailComponent } from './components/question/question-detail/question-detail.component';
import { ManageCourseComponent } from './manage-course.component';
import { ManageCourseRoutes } from './manage-course.routing';
import { ReuseableModule } from '../../reuseable/reuseable.module';
import { PreviewQuestionAiModalComponent } from './components/question/preview-question-ai-modal/preview-question-ai-modal.component';
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
    CourseRegisterComponent,
    QuestionAddAiComponent,
    PreviewQuestionAiModalComponent,
  ],
  imports: [
    CommonModule,
    ManageCourseRoutes,
    SharedModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzModalModule,
    NzUploadModule,
    NzSelectModule,
    NzRadioModule,
    NzIconModule,
    RouterModule,
    ReuseableModule,
  ],
})
export class ManageCourseModule {}
