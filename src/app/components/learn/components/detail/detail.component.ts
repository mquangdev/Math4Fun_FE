import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, interval } from 'rxjs';
import { QuestionType } from 'src/app/enums/question.enums';
import { LessonService } from 'src/app/services/lesson.service';
import { QuestionService } from 'src/app/services/question.service';
import { RightBarService } from 'src/app/services/right-bar.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  public expGained: number = 0;
  public lessonId: string = '';
  public listQuestion: any[] = [];
  public indexQuestionNow: number = 0;
  public QuestionType = QuestionType;
  public questionNow: any;
  public answerNow: any;
  public isSelected: boolean = false;
  public isTrue: boolean = false;
  public isChecked: boolean = false;
  public totalQuestion: number = 0;
  public countTrueQuestion: number = 0;
  public listWrongIndexQuestion: any[] = [];
  public isHasWrongQuestion: boolean = false;
  public isFinish: boolean = false;
  public percentCorrect: number = 0;
  public time: number = 0;
  private correctSound = new Audio();
  private wrongSound = new Audio();
  private timerSubscription!: Subscription;
  constructor(
    private rightbarService: RightBarService,
    private questionService: QuestionService,
    private route: ActivatedRoute,
    private lessonService: LessonService,
    private renderer: Renderer2,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.rightbarService.setIsShowBar({
      right: false,
      left: false,
    });
    this.route.params.subscribe((params) => {
      this.lessonId = params['id'];
    });
    this.detailLesson();
    this.countTime();
  }

  countTime() {
    this.timerSubscription = interval(1000).subscribe(() => {
      this.time += 1;
    });
  }

  stopTime() {
    this.timerSubscription.unsubscribe();
  }

  detailLesson() {
    this.lessonService.detail(this.lessonId).subscribe((data) => {
      if (!data || !data.questionList) return;
      this.expGained = data.expGained;
      this.listQuestion = data.questionList;
      this.indexQuestionNow = 0;
      this.totalQuestion = data.questionList.length;
      this.detailQuestion();
    });
  }
  detailQuestion() {
    if (!this.listQuestion || !this.listQuestion[this.indexQuestionNow]) return;
    let id = this.listQuestion[this.indexQuestionNow].id;
    this.questionService.detailQuestion(id).subscribe((data) => {
      this.questionNow = data;
    });
  }
  selectAnswer(ele: any, answer: any) {
    if (this.isChecked) return;
    this.isSelected = true;
    let element = ele.closest('.answer-button');
    let listQuestionEle = document.querySelectorAll('.answer-button');
    let indexEle = element.querySelector('.answer-button-index');
    listQuestionEle.forEach((ele) => {
      let indexElement = ele.querySelector('.answer-button-index');
      this.renderer.setStyle(ele, 'color', 'black');
      this.renderer.setStyle(ele, 'border', 'solid 2px #e5e5e5');
      this.renderer.setStyle(ele, 'border-bottom', 'solid 4px #e5e5e5');
      this.renderer.setStyle(ele, 'background-color', 'white');
      this.renderer.setStyle(indexElement, 'color', '#afafaf');
      this.renderer.setStyle(indexElement, 'border', 'solid 2px #e5e5e5');
    });
    this.renderer.setStyle(element, 'color', '#1899d6');
    this.renderer.setStyle(element, 'border', 'solid 2px #84d8ff');
    this.renderer.setStyle(element, 'border-bottom', 'solid 4px #84d8ff');
    this.renderer.setStyle(element, 'background-color', '#ddf4ff');
    this.renderer.setStyle(indexEle, 'color', '#1899d6');
    this.renderer.setStyle(indexEle, 'border', 'solid 2px #84d8ff');
    switch (this.questionNow.type) {
      case QuestionType.chooseAnswer: {
        this.answerNow = answer;
        break;
      }
    }
  }

  close() {
    this.router.navigate(['/main/learn']);
  }

  checkAnswer() {
    this.isChecked = true;
    switch (this.questionNow.type) {
      case QuestionType.chooseAnswer: {
        this.checkChooseAnswer();
        break;
      }
    }
  }

  checkChooseAnswer() {
    this.indexQuestionNow++;
    this.isTrue =
      this.questionNow.value === this.answerNow.value ? true : false;
    if (this.isTrue) {
      this.countTrueQuestion++;
      this.soundCorrect();
    } else {
      this.listQuestion.push(this.questionNow);
      this.soundWrong();
    }
  }

  reset() {
    this.isChecked = false;
    this.isTrue = false;
    this.isSelected = false;
  }

  nextQuestion() {
    if (this.countTrueQuestion < this.totalQuestion) {
      this.detailQuestion();
      this.reset();
    } else {
      this.isFinish = true;
      this.time = Math.floor(this.time / 60);
      if (this.listQuestion.length === this.totalQuestion) {
        this.percentCorrect = 100;
      } else {
        this.percentCorrect = Math.floor(
          ((this.totalQuestion -
            (this.listQuestion.length - this.totalQuestion)) *
            100) /
            this.totalQuestion
        );
      }
      this.stopTime();
    }
  }

  soundCorrect() {
    this.correctSound.src = './../../../../../assets/audio/correct.mp3';
    this.correctSound.play();
  }

  soundWrong() {
    this.wrongSound.src = './../../../../../assets/audio/wrong.mp3';
    this.wrongSound.play();
  }
}
