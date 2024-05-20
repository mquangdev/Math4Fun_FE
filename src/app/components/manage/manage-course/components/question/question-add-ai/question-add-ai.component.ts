import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { QuestionType } from 'src/app/enums/question.enums';
import { NotiService } from 'src/app/services/noti.service';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-question-add-ai',
  templateUrl: './question-add-ai.component.html',
  styleUrls: ['./question-add-ai.component.scss'],
})
export class QuestionAddAiComponent {
  public typeQuestion: QuestionType = QuestionType.typeToBlank;
  public content: string = '';
  public totalQuestions: number = 1;
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
    content: '',
    totalQuestions: 1,
  });
  constructor(
    private fb: FormBuilder,
    private noti: NotiService,
    private router: Router,
    private questionService: QuestionService
  ) {}
  add() {
    if (!this.content.trim() || !this.totalQuestions) {
      return;
    }
    let body = {
      content: this.content.trim(),
      numberQuestion: this.totalQuestions,
      type: this.typeQuestion,
    };
    this.questionService.addQuestionAI(body).subscribe(
      (data) => {
        console.log(data);
        // this.noti.success();
      },
      (err) => {
        console.log(err);
        // this.add();
        // this.noti.warning();
      }
    );
  }
}
