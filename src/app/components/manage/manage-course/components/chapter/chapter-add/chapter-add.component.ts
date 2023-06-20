import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzUploadChangeParam, NzUploadFile } from 'ng-zorro-antd/upload';
import { ChapterService } from 'src/app/services/chapter.service';
import { CourseService } from 'src/app/services/course.service';
import { NotiService } from 'src/app/services/noti.service';

@Component({
  selector: 'app-chapter-add',
  templateUrl: './chapter-add.component.html',
  styleUrls: ['./chapter-add.component.scss'],
})
export class ChapterAddComponent {
  @Input() courseId: string = '';
  public instruction: string = '';
  public form: FormGroup = this.fb.group({
    title: ['', [Validators.required]],
    subTile: ['', [Validators.required]],
    instruction: [''],
  });
  constructor(
    private fb: FormBuilder,
    private modalRef: NzModalRef,
    private msg: NzMessageService,
    private chapterSerive: ChapterService,
    private noti: NotiService
  ) {}

  cancel() {
    this.modalRef.close();
  }
  submitForm() {
    if (this.form.valid) {
      let body = {
        ...this.form.value,
        instruction: this.instruction,
        courseId: this.courseId,
      };
      this.chapterSerive.add(body).subscribe(
        (data) => {
          this.noti.success('Thêm chương học thành công');
          this.modalRef.close(true);
        },
        (error) => {
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

  beforeUpload = (file: NzUploadFile): boolean => {
    return false;
  };

  handleChange({ file, fileList }: NzUploadChangeParam): void {
    const status = file.status;
    if (status !== 'uploading') {
      console.log(file, fileList);
    }
    if (status === 'done') {
      this.msg.success(`${file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      this.msg.error(`${file.name} file upload failed.`);
    }
  }
}
