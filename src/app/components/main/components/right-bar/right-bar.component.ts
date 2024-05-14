import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { KeyStorage } from 'src/app/enums/storage.enums';
import { CommonService } from 'src/app/services/common.service';
import { RightBarService } from 'src/app/services/right-bar.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-right-bar',
  templateUrl: './right-bar.component.html',
  styleUrls: ['./right-bar.component.scss'],
})
export class RightBarComponent implements OnInit {
  public listCourse: any = [];
  public courseSelected: any;
  public user: any;
  constructor(
    private userService: UserService,
    private router: Router,
    private commonService: CommonService,
    private modal: NzModalService
  ) {}
  ngOnInit(): void {
    this.getAllCourseByUserId();
    this.getUserById();
  }
  getAllCourseByUserId() {
    this.userService
      .getAllCourseByUserId(localStorage.getItem(KeyStorage.user_id)!)
      .subscribe((data) => {
        this.listCourse = data;
        if (!localStorage.getItem(KeyStorage.id_course_selected)) {
          if (this.listCourse) {
            this.listCourse[0].isSelected = true;
          }
          this.courseSelected = this.listCourse[0];
          localStorage.setItem(
            KeyStorage.id_course_selected,
            this.courseSelected.id
          );
        } else {
          let idCourseSelected = localStorage.getItem(
            KeyStorage.id_course_selected
          );
          this.listCourse.map((c: any) => {
            if (c.id === idCourseSelected) {
              c.isSelected = true;
              this.courseSelected = c;
            }
          });
        }
        this.commonService.changeSelectedCourse(true);
      });
  }

  getUserById() {
    this.userService.getById().subscribe((data) => {
      this.user = data;
    });
  }

  addCourse() {
    this.router.navigate(['/main/manage-course/register']);
  }

  changeSelectCourse(course: any) {
    if (course.id === this.courseSelected.id) return;
    this.modal.confirm({
      nzTitle: `Chuyển sang khóa học ${course.name} ?`,
      nzOnOk: () => {
        this.listCourse.forEach((c: any) => {
          if (c.id != course.id) {
            c.isSelected = false;
          } else {
            c.isSelected = true;
          }
        });
        this.courseSelected = course;
        localStorage.setItem(KeyStorage.id_course_selected, course.id);
        this.commonService.changeSelectedCourse(true);
      },
    });
  }
}
