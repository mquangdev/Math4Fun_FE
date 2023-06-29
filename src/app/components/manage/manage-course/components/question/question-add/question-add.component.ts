import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { MathjaxComponent } from 'src/app/components/reuseable/mathjax/mathjax.component';
import { QuestionType } from 'src/app/enums/question.enums';
import { KeyStorage } from 'src/app/enums/storage.enums';
import { NotiService } from 'src/app/services/noti.service';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-question-add',
  templateUrl: './question-add.component.html',
  styleUrls: ['./question-add.component.scss'],
})
export class QuestionAddComponent implements OnInit {
  @ViewChild(MathjaxComponent) childView!: MathjaxComponent;
  public textQuestion: string = '';
  // mathContent = `When $ a \\ne 0 $, there are two solutions to \\(ax^2 + bx + c = 0 \\) and they are $$ x = {-b \\pm \\sqrt{b^2-4ac} \\over 2a}$$ Polynomial Equation $$ y = { x^3 -4x^2 + 5x -6}$$`;
  public QuestionType = QuestionType;
  public typeQuestion: QuestionType = QuestionType.chooseAnswer;
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
    text: [''],
    answer: [null],
  });
  public listAnswer: Answer[] = [];
  public listPair: Pair[] = [];
  public lessonId: string = '';
  constructor(
    private questionService: QuestionService,
    private fb: FormBuilder,
    private noti: NotiService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.lessonId = localStorage.getItem(KeyStorage.lesson_id)!;
  }
  cancel() {}
  submitForm() {
    if (this.form.valid) {
      if (this.typeQuestion === QuestionType.chooseAnswer) {
        let body = {
          text: this.textQuestion,
          image: null,
          type: this.typeQuestion,
          value: this.form.get('answer')?.value.value,
          lessonId: this.lessonId,
          answerList: this.listAnswer,
        };
        console.log(body);
        this.questionService.addQuestion(body).subscribe(
          (data) => {
            this.noti.success('Thêm câu hỏi thành công');
            this.router.navigate(['/main/manage-course/lesson', this.lessonId]);
          },
          (err) => {
            this.noti.warning();
          }
        );
      }
    }
    {
      Object.values(this.form.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
  addAnswer() {
    this.listAnswer.push(new Answer());
  }
  remove(answer: Answer) {
    this.listAnswer.splice(this.listAnswer.indexOf(answer), 1);
  }
  addPair() {
    this.listPair.push(new Pair());
  }
}

export class Answer {
  text?: string;
  value?: string;
}
export class Pair {
  text?: string;
  value?: string;
}
