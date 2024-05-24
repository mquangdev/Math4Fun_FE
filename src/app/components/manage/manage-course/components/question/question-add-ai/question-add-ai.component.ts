import { timer } from 'rxjs';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { QuestionType } from 'src/app/enums/question.enums';
import { NotiService } from 'src/app/services/noti.service';
import { QuestionService } from 'src/app/services/question.service';
import { KeyStorage } from 'src/app/enums/storage.enums';

@Component({
  selector: 'app-question-add-ai',
  templateUrl: './question-add-ai.component.html',
  styleUrls: ['./question-add-ai.component.scss'],
})
export class QuestionAddAiComponent {
  public questionType = [
    {
      text: 'Chọn cặp phù hợp',
      value: QuestionType.choosePair,
    },
    {
      text: 'Câu hỏi - lựa chọn',
      value: QuestionType.chooseAnswer,
    },
    {
      text: 'Chọn đáp án vào chỗ trống',
      value: QuestionType.chooseToBlank,
    },
    {
      text: 'Nhập số vào chỗ trống',
      value: QuestionType.typeToBlank,
    },
  ];
  public form: FormGroup = this.fb.group({
    content: ['', [Validators.required]],
    totalQuestions: [0, [Validators.required, Validators.min(1)]],
    typeQuestion: [QuestionType.chooseAnswer, [Validators.required]],
  });
  public isLoading: boolean = false;
  public lessonId: string = localStorage.getItem(KeyStorage.lesson_id)!;
  constructor(
    private fb: FormBuilder,
    private noti: NotiService,
    private router: Router,
    private questionService: QuestionService
  ) {}
  onAdd() {
    this.isLoading = true;
    this.noti.warning(
      'Quá trình thêm câu hỏi tự động đang được thực hiện, vui lòng chờ trong giây lát'
    );
    this.add();
  }
  add() {
    if (this.form.invalid) {
      return;
    }
    let body = {
      content: this.form.value.content,
      numberQuestion: this.form.value.totalQuestions,
      type: this.form.value.typeQuestion,
    };
    this.questionService.addQuestionAI(body).subscribe(
      (data) => {
        this.questionService
          .addQuestionListToDb(
            (data || data.questions).map((q: any) => {
              return {
                ...q,
                lessonId: this.lessonId,
              };
            })
          )
          .subscribe((data) => {
            this.isLoading = false;
            this.noti.success('Thêm câu hỏi tự động thành công');
            this.router.navigate(['/main/manage-course/lesson', this.lessonId]);
          });
      },
      (err) => {
        this.add();
      }
    );
  }
}
