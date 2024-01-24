import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../../../../services/course.service';
import { Course } from '../../../../../models/course.models';
import { KeyStorage } from '../../../../../enums/storage.enums';
import { UserService } from '../../../../../services/user.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { CommonService } from '../../../../../services/common.service';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.scss'],
})
export class EditCourseComponent implements OnInit {
  public listCourse: Course[] = [];
  constructor(
    private userService: UserService,
    private modal: NzModalService,
    private courseService: CourseService,
    private commonService: CommonService,
  ) {}
  ngOnInit(): void {
    this.userService
      .getAllCourseByUserId(localStorage.getItem(KeyStorage.user_id)!)
      .subscribe((data) => {
        console.log(data);
        this.listCourse = data;
      });
  }

  leaveCourse(course: Course) {
    console.log(course);
    let confirmModal = this.modal.confirm({
      nzTitle: 'Bạn có chắc chắn muốn rời khóa học này?',
      nzOnOk: () => {
        this.courseService
          .leaveCourseByUser(
            localStorage.getItem(KeyStorage.user_id)!,
            course.id,
          )
          .subscribe((data) => {
            this.listCourse = this.listCourse.filter((c) => c.id !== course.id);
            localStorage.setItem(
              KeyStorage.id_course_selected,
              this.listCourse[0].id,
            );
            this.commonService.changeSelectedCourse(true);
          });
      },
    });
  }
}
