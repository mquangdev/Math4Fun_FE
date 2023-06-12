import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { ManageCourseRoutes } from './manage-course.routing';
import { ReuseableModule } from '../../reuseable/reuseable.module';
import { ManageCourseComponent } from './manage-course.component';
import { CourseAddComponent } from './components/course-add/course-add.component';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { CourseDetailComponent } from './components/course-detail/course-detail.component';
import { CourseManageComponent } from './components/course-manage/course-manage.component';
import { RouterModule } from '@angular/router';
@NgModule({
  declarations: [
    ManageCourseComponent,
    CourseAddComponent,
    CourseDetailComponent,
    CourseManageComponent,
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
    RouterModule,
  ],
})
export class ManageCourseModule {}
