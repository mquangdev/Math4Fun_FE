import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { CourseService } from 'src/app/services/course.service';
import { NotiService } from 'src/app/services/noti.service';
import { UploadService } from 'src/app/services/upload.service';
import { ChapterAddComponent } from '../../chapter/chapter-add/chapter-add.component';
import { ChapterService } from 'src/app/services/chapter.service';
import { KeyStorage } from 'src/app/enums/storage.enums';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.scss'],
})
export class CourseDetailComponent implements OnInit {
  public image: any = '';
  public file: any;
  public form: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    description: ['', [Validators.required]],
  });
  public id: string = '';
  public isEmptyImage: boolean = false;
  public course: any;
  constructor(
    private fb: FormBuilder,
    private uploadService: UploadService,
    private courseService: CourseService,
    private noti: NotiService,
    private route: ActivatedRoute,
    private router: Router,
    private modal: NzModalService,
    private chapterService: ChapterService
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.detailCourse();
    });
  }

  detailChapter() {
    localStorage.setItem(KeyStorage.course_id, this.id);
  }

  async submitForm() {
    if (this.form.valid) {
      if (!this.image) {
        this.noti.warning('Chưa tải hình ảnh khóa học lên !');
        return;
      }
      let body: any = { id: this.id, ...this.form.value, image: this.image };
      if (this.isEmptyImage) {
        let upload = await this.uploadService
          .uploadFile(this.file, 'image')
          .toPromise();
        body.image = upload[0];
      }
      let updateCourse = await this.courseService
        .updateCourse(body)
        .toPromise();
      if (updateCourse) {
        this.noti.success();
        this.router.navigate(['/main/manage-course']);
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

  cancel() {}

  onChange($event: any) {
    const file = $event;
    this.file = $event;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.image = reader.result;
    };
  }

  removeImage() {
    this.image = '';
    this.isEmptyImage = true;
  }

  removeChapter(id: string) {
    this.chapterService.delete(id).subscribe(
      (data) => {
        this.noti.success();
        this.detailCourse();
      },
      (error) => {
        this.noti.warning();
      }
    );
  }

  detailCourse() {
    this.courseService.detailCourse(this.id).subscribe((data) => {
      this.course = data;
      this.form.patchValue({
        name: data.name,
        description: data.description,
      });
      this.image = data.image;
      if (!this.image) this.isEmptyImage = true;
    });
  }

  addChapter() {
    const modal = this.modal.create({
      nzContent: ChapterAddComponent,
      nzTitle: 'Thêm mới chương học',
      nzCentered: true,
      nzFooter: null,
      nzComponentParams: {
        courseId: this.id,
      },
    });
    modal.afterClose.subscribe((data) => {
      if (data) this.detailCourse();
    });
  }
}
