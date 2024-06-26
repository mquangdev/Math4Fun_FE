import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { KeyStorage } from 'src/app/enums/storage.enums';
import { CommonService } from 'src/app/services/common.service';
import { UserService } from 'src/app/services/user.service';
import { StreakComponent } from './streak/streak.component';
import { HttpClient } from '@angular/common/http';
import { StreakService } from 'src/app/services/streak.service';
import {
  StreakCurrent,
  StreakUpdateResponse,
} from 'src/app/models/streak.models';

@Component({
  selector: 'app-right-bar',
  templateUrl: './right-bar.component.html',
  styleUrls: ['./right-bar.component.scss'],
})
export class RightBarComponent implements OnInit {
  @ViewChild('closeIcon', { read: TemplateRef }) closeIcon!: TemplateRef<any>;
  public listCourse: any = [];
  public courseSelected: any;
  public user: any;
  public streakCurrent?: StreakUpdateResponse;
  constructor(
    private userService: UserService,
    private router: Router,
    private commonService: CommonService,
    private modal: NzModalService,
    private streakService: StreakService
  ) {}
  ngOnInit(): void {
    this.getAllCourseByUserId();
    this.getUserById();
    this.getCurrentStreak();
  }
  getCurrentStreak() {
    this.streakService
      .getCurrentStreak()
      .subscribe((data: StreakUpdateResponse) => {
        this.streakCurrent = data;
        this.commonService.setStreakInformation(this.streakCurrent.streak);
        if (!data.isContinueStreakUpdate) {
          console.log('Không ổn rồi!');
        }
      });
  }
  getAllCourseByUserId() {
    this.userService.getAllCourseByUserId().subscribe((data) => {
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

  openStreakCalendar() {
    let modal = this.modal.create<StreakComponent>({
      nzContent: StreakComponent,
      nzClassName: 'fullModal',
      nzBodyStyle: {
        padding: '0px',
        // maxHeight: 'calc(100vh - 200px)',
        // overflowY: 'auto',
      },
      nzCloseIcon: this.closeIcon,
    });
  }
}
