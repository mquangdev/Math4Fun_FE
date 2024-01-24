import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionType } from 'src/app/enums/question.enums';
import { QuestionService } from 'src/app/services/question.service';
import { Answer, Question } from '../../../../../../models/question.models';
import { NotiService } from 'src/app/services/noti.service';

@Component({
  selector: 'app-question-detail',
  templateUrl: './question-detail.component.html',
  styleUrls: ['./question-detail.component.scss'],
})
export class QuestionDetailComponent implements OnInit {
  public questionId!: string;
  public questionType!: QuestionType;
  public QuestionType = QuestionType;
  public listAnswer: Answer[] = [];
  public question: Question = new Question();
  constructor(
    private questionService: QuestionService,
    private route: ActivatedRoute,
    private noti: NotiService,
    private router: Router,
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.questionId = params['id'];
    });
    this.getDetailQuestion();
  }

  getDetailQuestion() {
    this.questionService
      .detailQuestion(this.questionId)
      .subscribe((data: Question) => {
        this.listAnswer = data.answerList!;
        this.question = data;
        this.questionType = this.question.type!;
      });
  }

  remove(answer: any) {
    this.listAnswer.splice(this.listAnswer.indexOf(answer), 1);
  }

  update() {
    switch (this.questionType) {
      case QuestionType.chooseAnswer: {
        this.updateTypeChooseAnswer();
        break;
      }
      case QuestionType.chooseToBlank: {
        this.updateTypeChooseToBlank();
        break;
      }
      case QuestionType.typeToBlank: {
        this.updateTypeTypeToBlank();
        break;
      }
      case QuestionType.choosePair: {
        this.updateTypeChoosePair();
        break;
      }
    }
  }

  updateTypeChoosePair() {
    let body = {
      id: this.question.id,
      text: this.question.text,
      image: this.question.image,
      type: this.question.type,
      value: this.question.value,
      answerList: this.listAnswer.map((answer) => {
        if (answer.id) {
          return {
            id: answer.id,
            text: answer.text,
            value: answer.value,
          };
        } else {
          return {
            text: answer.text,
            value: answer.value,
          };
        }
      }),
    };
    this.questionService.updateQuestion(body).subscribe(
      (data) => {
        this.noti.success();
        // this.router.navigate(['lesson', this.question.lessonId]);
        window.history.back();
      },
      (err) => {
        this.noti.warning();
      },
    );
  }
  updateTypeTypeToBlank() {
    let body = {
      id: this.question.id,
      text: this.question.text,
      image: this.question.image,
      type: this.question.type,
      value: this.question.value,
      answerList: [],
    };
    // console.log(body);
    this.questionService.updateQuestion(body).subscribe(
      (data) => {
        this.noti.success();
        window.history.back();
      },
      (err) => {
        this.noti.warning();
      },
    );
  }

  updateTypeChooseToBlank() {
    let body = {
      id: this.question.id,
      text: this.question.text,
      image: this.question.image,
      type: this.question.type,
      value: this.question.value,
      answerList: this.listAnswer.map((answer) => {
        if (answer.id) {
          return {
            id: answer.id,
            text: answer.text,
            value: answer.value,
          };
        } else {
          return {
            text: answer.text,
            value: answer.value,
          };
        }
      }),
    };
    this.questionService.updateQuestion(body).subscribe(
      (data) => {
        this.noti.success();
        // this.router.navigate(['lesson', this.question.lessonId]);
        window.history.back();
      },
      (err) => {
        this.noti.warning();
      },
    );
  }

  updateTypeChooseAnswer() {
    let body = {
      id: this.question.id,
      text: this.question.text,
      image: this.question.image,
      type: this.question.type,
      value: this.question.value,
      answerList: this.listAnswer.map((answer) => {
        if (answer.id) {
          return {
            id: answer.id,
            text: answer.text,
            value: answer.value,
          };
        } else {
          return {
            text: answer.text,
            value: answer.value,
          };
        }
      }),
    };
    this.questionService.updateQuestion(body).subscribe(
      (data) => {
        this.noti.success();
        // this.router.navigate([
        //   '/main/manage-course/lesson',
        //   this.question.lessonId,
        // ]);
        window.history.back();
      },
      (err) => {
        this.noti.warning();
      },
    );
  }

  addAnswer() {
    this.listAnswer.push(new Answer());
  }
}
