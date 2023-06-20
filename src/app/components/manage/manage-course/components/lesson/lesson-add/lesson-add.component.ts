import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { LessonService } from 'src/app/services/lesson.service';
import { NotiService } from 'src/app/services/noti.service';

@Component({
  selector: 'app-lesson-add',
  templateUrl: './lesson-add.component.html',
  styleUrls: ['./lesson-add.component.scss'],
})
export class LessonAddComponent implements OnInit {
  @Input() chapterId!: string;
  public form: FormGroup = this.fb.group({
    title: ['', [Validators.required]],
    expGained: ['', [Validators.required]],
  });
  constructor(
    private modalRef: NzModalRef,
    private fb: FormBuilder,
    private lessonService: LessonService,
    private noti: NotiService
  ) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  submitForm() {
    if (this.form.valid) {
      let body = {
        ...this.form.value,
        chapterId: this.chapterId,
      };
      this.lessonService.add(body).subscribe(
        (data) => {
          this.noti.success('Thêm mới bài học thành công');
          this.modalRef.close(true);
        },
        (err) => {
          this.noti.warning();
        }
      );
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
}
