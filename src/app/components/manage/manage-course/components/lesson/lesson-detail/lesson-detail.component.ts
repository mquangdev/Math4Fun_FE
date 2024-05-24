import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { QuestionType } from 'src/app/enums/question.enums';
import { KeyStorage } from 'src/app/enums/storage.enums';
import { Lesson } from 'src/app/models/course.models';
import { LessonService } from 'src/app/services/lesson.service';
import { NotiService } from 'src/app/services/noti.service';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-leson-detail',
  templateUrl: './lesson-detail.component.html',
  styleUrls: ['./lesson-detail.component.scss'],
})
export class LessonDetailComponent implements OnInit {
  public form: FormGroup = this.fb.group({
    title: ['', [Validators.required]],
    expGained: ['', [Validators.required]],
  });
  public lessonId: string = '';
  public chapterId: string = '';
  public lesson: Lesson = new Lesson();
  public QuestionType = QuestionType;
  constructor(
    private fb: FormBuilder,
    private noti: NotiService,
    private lessonService: LessonService,
    private router: Router,
    private route: ActivatedRoute,
    private modal: NzModalService,
    private questionService: QuestionService
  ) {}
  ngOnInit(): void {
    this.chapterId = localStorage.getItem(KeyStorage.chapter_id)!;
    this.route.params.subscribe((params) => {
      this.lessonId = params['id'];
      this.detailLesson();
    });
  }

  detailLesson() {
    this.lessonService.detail(this.lessonId).subscribe((data) => {
      this.lesson = data;
      this.form.patchValue({
        title: data.title,
        expGained: data.expGained,
      });
    });
  }

  cancel() {
    this.router.navigate(['/main/manage-course/chapter', this.chapterId]);
  }

  submitForm() {
    if (this.form.valid) {
      let body = {
        id: this.lessonId,
        ...this.form.value,
      };
      this.lessonService.update(body).subscribe(
        (data) => {
          this.noti.success();
          this.cancel();
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

  addQuestion() {
    this.router.navigate(['/main/manage-course/question-add']);
    // this.modal.create({
    //   nzContent: QuestionAddComponent,
    //   nzFooter: null,
    //   nzTitle: 'Thêm mới câu hỏi',
    //   nzCentered: true,
    //   nzBodyStyle: {
    //     height: '80vh',
    //     overflowY: 'auto',
    //   },
    // });
  }
  addQuestionAI() {
    this.router.navigate(['/main/manage-course/question-add-ai']);
  }

  detailQuestion(question: any) {
    const queryParams: NavigationExtras = {
      queryParams: {
        type: question.type,
      },
    };
    this.router.navigate(
      ['/main/manage-course/question', question.id],
      queryParams
    );
  }

  removeQuestion(questionId: string) {
    this.questionService.removeQuestion(questionId).subscribe(
      (data) => {
        this.noti.success();
        this.detailLesson();
      },
      (err) => {
        this.noti.warning();
      }
    );
  }
}
