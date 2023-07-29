import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionType } from 'src/app/enums/question.enums';
import { QuestionService } from 'src/app/services/question.service';
import { Answer, Question } from '../../../models/question.models';
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
    private router: Router
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
    }
  }

  updateTypeChooseAnswer() {
    let body = {
      id: this.question.id,
      text: this.question.text,
      image: this.question.image,
      type: this.question.type,
      value: this.question.value,
      answerList: this.listAnswer.map((answer) => {
        return {
          text: answer.text,
          value: answer.value,
        };
      }),
    };
    this.questionService.updateQuestion(body).subscribe(
      (data) => {
        this.noti.success();
        this.router.navigate(['lesson', this.question.lessonId]);
      },
      (err) => {
        this.noti.warning();
      }
    );
  }

  addAnswer() {
    this.listAnswer.push(new Answer());
  }
}
