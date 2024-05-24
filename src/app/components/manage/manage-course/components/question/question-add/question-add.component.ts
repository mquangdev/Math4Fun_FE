import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MathjaxComponent } from 'src/app/components/reuseable/mathjax/mathjax.component';
import { QuestionType } from 'src/app/enums/question.enums';
import { KeyStorage } from 'src/app/enums/storage.enums';
import { NotiService } from 'src/app/services/noti.service';
import { QuestionService } from 'src/app/services/question.service';
import { Answer, Pair } from '../../../../../../models/question.models';

@Component({
  selector: 'app-question-add',
  templateUrl: './question-add.component.html',
  styleUrls: ['./question-add.component.scss'],
})
export class QuestionAddComponent implements OnInit {
  @ViewChild(MathjaxComponent) childView!: MathjaxComponent;
  public textQuestion: string = '';
  public textBonus: string = '';
  public QuestionType = QuestionType;
  public typeQuestion: QuestionType = QuestionType.typeToBlank;
  public answerValue: string = '';
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
  // ----- type choose pair, choose answer -----
  public listAnswer: Answer[] = [];
  public listPair: Pair[] = [];
  public lessonId: string = '';
  // ----- end type choose pair -----
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
      switch (this.typeQuestion) {
        case QuestionType.chooseAnswer: {
          this.addTypeChooseAnswer();
          break;
        }
        case QuestionType.choosePair: {
          this.addTypeChoosePair();
          break;
        }
        case QuestionType.chooseToBlank: {
          this.addTypeChooseToBlank();
          break;
        }
        case QuestionType.typeToBlank: {
          this.addTypeTypeToBlank();
          ('');
          break;
        }
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
  changeRightAnswer(e: any) {
    this.answerValue = e.value;
  }

  // ----- Add Type -----
  addTypeChooseAnswer() {
    let body = {
      text: this.textQuestion,
      image: null,
      type: this.typeQuestion,
      value: this.form.get('answer')?.value.value,
      lessonId: this.lessonId,
      answerList: this.listAnswer,
    };
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

  addTypeChoosePair() {
    let body: any = {
      text: 'Chọn cặp phù hợp',
      image: null,
      type: this.typeQuestion,
      lessonId: this.lessonId,
      answerList: this.listAnswer,
    };
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
  addTypeChooseToBlank() {
    let body = {
      text: this.textQuestion,
      textBonus: this.textBonus,
      image: null,
      type: this.typeQuestion,
      value: this.form.get('answer')?.value?.value,
      lessonId: this.lessonId,
      answerList: this.listAnswer,
    };
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
  addTypeTypeToBlank() {
    let body = {
      text: this.textQuestion,
      image: null,
      type: this.typeQuestion,
      value: this.answerValue.trim(),
      lessonId: this.lessonId,
    };
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
  // ---- End Add Type ----
}
