import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { CourseAddComponent } from '../course-add/course-add.component';
import { NotiService } from 'src/app/services/noti.service';
@Component({
  selector: 'app-course-manage',
  templateUrl: './course-manage.component.html',
  styleUrls: ['./course-manage.component.scss'],
  providers: [CourseService],
})
export class CourseManageComponent implements OnInit {
  public data = [
    {
      stt: 1,
      name: 'Lớp 1',
    },
    {
      stt: 2,
      name: 'Lớp 2',
    },
    {
      stt: 3,
      name: 'Lớp 3',
    },
  ];
  public listCourses: any[] = [];
  public loadFailImg = './../../../../assets/images/img-load-fail.png';
  constructor(
    private courseService: CourseService,
    private modal: NzModalService,
    private noti: NotiService
  ) {}
  ngOnInit(): void {
    this.getAllCourse();
  }

  getAllCourse() {
    this.courseService.getAllCourse().subscribe((data) => {
      this.listCourses = data;
    });
  }

  addCourse() {
    const modal = this.modal.create({
      nzContent: CourseAddComponent,
      nzOkText: 'Thêm',
      nzCancelText: 'Hủy',
      nzTitle: 'Thêm mới khóa học',
      nzCentered: true,
      nzFooter: null,
    });
    modal.afterClose.subscribe((data) => {
      if (data) {
        this.getAllCourse();
      }
    });
  }

  remove(id: string) {
    this.courseService.delete(id).subscribe(
      (data) => {
        this.noti.success('Xóa thành công');
        this.getAllCourse();
      },
      (err) => {
        this.noti.warning();
      }
    );
  }
}
