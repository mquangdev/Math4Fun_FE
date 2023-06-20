import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NzUploadChangeParam, NzUploadFile } from 'ng-zorro-antd/upload';
import { KeyStorage } from 'src/app/enums/storage.enums';
import { ChapterService } from 'src/app/services/chapter.service';
import { LessonService } from 'src/app/services/lesson.service';
import { NotiService } from 'src/app/services/noti.service';
import { LessonAddComponent } from '../../lesson/lesson-add/lesson-add.component';

@Component({
  selector: 'app-chapter-detail',
  templateUrl: './chapter-detail.component.html',
  styleUrls: ['./chapter-detail.component.scss'],
})
export class ChapterDetailComponent implements OnInit {
  public instruction: string = '';
  public id: string = '';
  public form: FormGroup = this.fb.group({
    title: ['', [Validators.required]],
    subTile: ['', [Validators.required]],
  });
  public chapter: any;
  public courseId: string = localStorage.getItem(KeyStorage.course_id)!;
  constructor(
    private fb: FormBuilder,
    private msg: NzMessageService,
    private chapterSerive: ChapterService,
    private noti: NotiService,
    private router: Router,
    private route: ActivatedRoute,
    private lessonService: LessonService,
    private modal: NzModalService
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      localStorage.setItem(KeyStorage.chapter_id, this.id);
      this.detailChapter();
    });
  }

  detailChapter() {
    this.chapterSerive.detail(this.id).subscribe((data) => {
      console.log(data);
      this.chapter = data;
      this.form.patchValue({
        title: data.title,
        subTile: data.subTile,
      });
      this.instruction = data.instruction;
    });
  }

  detailLesson(id: string) {
    this.router.navigate(['/main/manage-course/lesson', id]);
    localStorage.setItem(KeyStorage.lesson_id, id);
  }

  removeLesson(id: string) {
    this.lessonService.delete(id).subscribe(
      (data) => {
        this.noti.success();
        this.detailChapter();
      },
      (err) => {
        this.noti.warning();
      }
    );
  }

  cancel() {}
  submitForm() {
    if (this.form.valid) {
      let body = {
        id: this.id,
        ...this.form.value,
        instruction: this.instruction,
      };
      this.chapterSerive.update(body).subscribe(
        (data) => {
          this.noti.success();
          this.router.navigate(['/main/manage-course/detail', this.courseId]);
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

  addLesson() {
    const modal = this.modal.create({
      nzContent: LessonAddComponent,
      nzFooter: null,
      nzTitle: 'Thêm mới bài học',
      nzComponentParams: {
        chapterId: this.id,
      },
    });
    modal.afterClose.subscribe((data) => {
      if (data) {
        this.detailChapter();
      }
    });
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
