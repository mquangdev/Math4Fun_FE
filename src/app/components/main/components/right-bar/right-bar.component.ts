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
    private commonService: CommonService
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
        if (this.listCourse) {
          this.listCourse[0].isSelected = true;
        }
        this.courseSelected = this.listCourse[0];
        localStorage.setItem(
          KeyStorage.id_course_selected,
          this.courseSelected.id
        );
        this.commonService.changeSelectedCourse(true);
      });
  }

  getUserById() {
    this.userService
      .getById(localStorage.getItem(KeyStorage.user_id)!)
      .subscribe((data) => {
        this.user = data;
      });
  }

  addCourse() {
    this.router.navigate(['/main/manage-course/register']);
  }
}
