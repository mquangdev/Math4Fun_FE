import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { CourseService } from 'src/app/services/course.service';
import { NotiService } from 'src/app/services/noti.service';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-course-add',
  templateUrl: './course-add.component.html',
  styleUrls: ['./course-add.component.scss'],
})
export class CourseAddComponent {
  public image: any = '';
  public file: any;
  public form: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    description: ['', [Validators.required]],
  });
  constructor(
    private fb: FormBuilder,
    private modalRef: NzModalRef,
    private uploadService: UploadService,
    private courseService: CourseService,
    private noti: NotiService
  ) {}

  async submitForm() {
    if (this.form.valid) {
      if (!this.image) {
        this.noti.warning('Chưa tải hình ảnh khóa học lên !');
        return;
      }
      let upload = await this.uploadService
        .uploadFile(this.file, 'image')
        .toPromise();
      if (upload[0]) {
        let body = {
          ...this.form.value,
          image: upload[0],
        };
        let addCourse = await this.courseService.addCourse(body).toPromise();
        if (addCourse) {
          this.noti.success('Thêm khóa học thành công');
          this.modalRef.close(true);
        }
      }
    } else {
      Object.values(this.form.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  cancel() {
    this.modalRef.close();
  }

  onChange($event: any) {
    const file = $event;
    this.file = $event;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.image = reader.result;
    };
  }

  remove() {
    this.image = '';
  }
}
