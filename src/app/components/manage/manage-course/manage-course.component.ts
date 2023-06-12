import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { CourseAddComponent } from './components/course-add/course-add.component';
@Component({
  selector: 'app-manage-course',
  templateUrl: './manage-course.component.html',
  styleUrls: ['./manage-course.component.scss'],
})
export class ManageCourseComponent {}
