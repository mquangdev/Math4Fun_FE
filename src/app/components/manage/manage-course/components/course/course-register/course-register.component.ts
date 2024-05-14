import { Component, OnDestroy, OnInit } from '@angular/core';
import { KeyStorage } from 'src/app/enums/storage.enums';
import { CourseService } from 'src/app/services/course.service';
import { NotiService } from 'src/app/services/noti.service';
import { RightBarService } from 'src/app/services/right-bar.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-course-register',
  templateUrl: './course-register.component.html',
  styleUrls: ['./course-register.component.scss'],
})
export class CourseRegisterComponent implements OnInit, OnDestroy {
  public listAllCourse: any[] = [];
  public isShowStartCourse: boolean[] = Array(1000).fill(false);
  constructor(
    private courseService: CourseService,
    private rightBarService: RightBarService,
    private userService: UserService,
    private noti: NotiService
  ) {}
  ngOnDestroy(): void {
    this.rightBarService.setIsShowBar({
      left: true,
      right: true,
    });
  }
  ngOnInit(): void {
    this.rightBarService.setIsShowBar({
      left: true,
      right: false,
    });
    this.getAllCourse();
    this.getAllCourseByUserId();
  }
  getAllCourse() {
    this.courseService.getAllCourse().subscribe((data) => {
      this.listAllCourse = data;
      console.log(data);
    });
  }

  getAllCourseByUserId() {
    this.userService.getAllCourseByUserId().subscribe((data) => {
      let listCourseRegisted = data.map((c: any) => {
        return c.id;
      });
      this.listAllCourse.forEach((c: any) => {
        if (listCourseRegisted.includes(c.id)) {
          c.isRegisted = true;
        }
      });
    });
  }

  selectCourse(i: number) {
    this.isShowStartCourse = Array(1000).fill(false);
    this.isShowStartCourse[i] = true;
  }

  register(courseId: string) {
    let body = {
      userId: localStorage.getItem(KeyStorage.user_id),
      courseId: courseId,
    };
    this.userService.registerCourse(body).subscribe(
      (data) => {
        this.noti.success('Đăng ký khóa học thành công');
        this.getAllCourseByUserId();
      },
      (err) => {
        this.noti.warning(err.error);
      }
    );
  }
}
