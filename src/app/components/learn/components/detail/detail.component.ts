import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, interval } from 'rxjs';
import { Question } from 'src/app/models/question.models';
import { QuestionType } from 'src/app/enums/question.enums';
import { LessonService } from 'src/app/services/lesson.service';
import { QuestionService } from 'src/app/services/question.service';
import { RightBarService } from 'src/app/services/right-bar.service';
import { KeyStorage } from 'src/app/enums/storage.enums';

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
  public questionNow: Question = new Question();
  public answerNow: any;
  public isSelected: boolean = false;
  public isTrue: boolean = true;
  public isChecked: boolean = false;
  public totalQuestion: number = 0;
  public countTrueQuestion: number = 0;
  public listWrongIndexQuestion: any[] = [];
  public isHasWrongQuestion: boolean = false;
  public isFinish: boolean = false;
  public isContinueStreak: boolean = false;
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
      localStorage.setItem(KeyStorage.chapter_id, data.chapterId);
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

  close() {
    this.router.navigate(['/main/learn']);
  }

  // ---- common ----
  checkAnswer() {
    this.isChecked = true;
    switch (this.questionNow.type) {
      case QuestionType.chooseAnswer: {
        this.checkChooseAnswer();
        break;
      }
      case QuestionType.chooseToBlank: {
        this.checkChooseToBlank();
        break;
      }
      case QuestionType.typeToBlank: {
        this.checkTypeToBlank();
        break;
      }
    }
  }

  chooseWrongAnswer() {
    this.listQuestion.push(this.questionNow);
    this.soundWrong();
  }
  // ---- end common ----

  // ---- type choose answer  ----
  checkChooseAnswer() {
    // this.indexQuestionNow++;
    this.isTrue =
      this.questionNow.value === this.answerNow.value ? true : false;
    if (this.isTrue) {
      this.countTrueQuestion++;
      this.soundCorrect();
    } else {
      this.chooseWrongAnswer();
    }
  }
  checkChooseToBlank() {
    // this.indexQuestionNow++;
    this.isTrue =
      this.questionNow.value === this.answerNow.value ? true : false;
    if (this.isTrue) {
      this.countTrueQuestion++;
      this.soundCorrect();
    } else {
      this.chooseWrongAnswer();
    }
  }
  checkTypeToBlank() {
    // this.indexQuestionNow++;
    if (this.questionNow.value) {
      this.questionNow.value = this.questionNow.value.replace(
        /^[$]+|[$]+$/g,
        ''
      );
      console.log(this.questionNow.value);
    }
    this.isTrue =
      this.questionNow.value === this.answerNow.value ? true : false;
    if (this.isTrue) {
      this.countTrueQuestion++;
      this.soundCorrect();
    } else {
      this.chooseWrongAnswer();
    }
  }
  // ---- end type choose answer ----
  // ---- type choose pair ----
  handleIsTrueEmit(e: any) {
    this.isTrue = e;
    this.isSelected = true;
    this.isChecked = true;
    // this.indexQuestionNow++;
    if (this.isTrue) {
      this.countTrueQuestion++;
      this.soundCorrect();
    } else {
      this.chooseWrongAnswer();
    }
  }
  // ---- end type choose pair ----
  reset() {
    this.isChecked = false;
    this.isTrue = true;
    this.isSelected = false;
  }

  nextQuestion() {
    if (this.countTrueQuestion < this.totalQuestion) {
      this.indexQuestionNow++;
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
