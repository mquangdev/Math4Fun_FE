import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  Renderer2,
  SimpleChanges,
} from '@angular/core';
import { Answer, Question } from 'src/app/models/question.models';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-type-choose-pair',
  templateUrl: './type-choose-pair.component.html',
  styleUrls: ['./type-choose-pair.component.scss'],
})
export class TypeChoosePairComponent implements OnChanges {
  @Input() question: Question = new Question();
  @Input() isTrue: boolean = true;
  @Output() isTrue$: EventEmitter<boolean> = new EventEmitter(true);
  public listQuestion: Answer[] = []; // Answer[]
  public listAnswer: {
    id?: string;
    value?: string;
  }[] = [];
  public questionSelected: Answer = new Answer();
  public answerSelected: any;
  public questionEle: Element = new Element();
  public answerEle: Element = new Element();
  public listIdsQuestionTrue: string[] = [];
  constructor(
    private commonService: CommonService,
    private renderer: Renderer2,
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['question']) {
      this.handleInit();
    }
  }

  handleInit() {
    this.listQuestion = this.question.answerList!;
    this.listAnswer =
      this.question.answerList?.map((answer: Answer) => {
        return {
          id: answer.id,
          value: answer.value,
        };
      }) || [];
    this.listQuestion = this.commonService.shuffleArray(this.listQuestion);
    this.listAnswer = this.commonService.shuffleArray(this.listAnswer);
    this.reset();
  }

  chooseQuestion(ele: any, question: Question) {
    if (!this.isTrue) return;
    if (this.listIdsQuestionTrue.includes(question.id!)) return;
    let element = ele.closest('.question-button');
    let listQuestionEle = Array.from(
      document.querySelectorAll('.question-button'),
    );
    listQuestionEle = listQuestionEle.filter((ele) => {
      return !this.listIdsQuestionTrue.includes(ele.id);
    });
    let indexEle = element.querySelector('.question-button-index');
    this.resetStyle(listQuestionEle, '.question-button-index');
    this.renderer.setStyle(element, 'color', '#1899d6');
    this.renderer.setStyle(element, 'border', 'solid 2px #84d8ff');
    this.renderer.setStyle(element, 'border-bottom', 'solid 4px #84d8ff');
    this.renderer.setStyle(element, 'background-color', '#ddf4ff');
    this.renderer.setStyle(indexEle, 'color', '#1899d6');
    this.renderer.setStyle(indexEle, 'border', 'solid 2px #84d8ff');
    this.questionSelected = question;
    this.questionEle.ele = element;
    this.questionEle.indexEle = indexEle;
    this.checkPair();
  }

  chooseAnswer(ele: any, answer: any) {
    if (!this.isTrue) return;
    if (this.listIdsQuestionTrue.includes(answer.id)) return;
    let element = ele.closest('.answer-button');
    let listAnswerEle = Array.from(document.querySelectorAll('.answer-button'));
    listAnswerEle = listAnswerEle.filter((ele) => {
      return !this.listIdsQuestionTrue.includes(ele.id);
    });
    let indexEle = element.querySelector('.answer-button-index');
    this.resetStyle(listAnswerEle, '.answer-button-index');
    this.renderer.setStyle(element, 'color', '#1899d6');
    this.renderer.setStyle(element, 'border', 'solid 2px #84d8ff');
    this.renderer.setStyle(element, 'border-bottom', 'solid 4px #84d8ff');
    this.renderer.setStyle(element, 'background-color', '#ddf4ff');
    this.renderer.setStyle(indexEle, 'color', '#1899d6');
    this.renderer.setStyle(indexEle, 'border', 'solid 2px #84d8ff');
    this.answerSelected = answer;
    this.answerEle.ele = element;
    this.answerEle.indexEle = indexEle;
    this.checkPair();
  }

  resetStyle(list: any, className: any) {
    list.forEach((ele: any) => {
      let indexElement = ele.querySelector(className);
      this.renderer.setStyle(ele, 'color', 'black');
      this.renderer.setStyle(ele, 'border', 'solid 2px #e5e5e5');
      this.renderer.setStyle(ele, 'border-bottom', 'solid 4px #e5e5e5');
      this.renderer.setStyle(ele, 'background-color', 'white');
      this.renderer.setStyle(indexElement, 'color', '#afafaf');
      this.renderer.setStyle(indexElement, 'border', 'solid 2px #e5e5e5');
    });
  }

  truePair(element: Element) {
    this.renderer.setStyle(element.ele, 'color', '#58cc02');
    this.renderer.setStyle(element.ele, 'border', 'solid 2px #58cc02');
    this.renderer.setStyle(element.ele, 'border-bottom', 'solid 4px #58cc02');
    this.renderer.setStyle(element.ele, 'background-color', 'rgb(187 247 208)');
    this.renderer.setStyle(element.indexEle, 'color', '#58cc02');
    this.renderer.setStyle(element.indexEle, 'border', 'solid 2px #58cc02');
    this.isTrue = true;
    this.answerSelected = null;
    this.questionSelected = new Answer();
  }

  wrongPair(element: Element) {
    this.renderer.setStyle(element.ele, 'color', 'rgb(239 68 68)');
    this.renderer.setStyle(element.ele, 'border', 'solid 2px rgb(239 68 68)');
    this.renderer.setStyle(
      element.ele,
      'border-bottom',
      'solid 4px rgb(239 68 68)',
    );
    this.renderer.setStyle(element.ele, 'background-color', 'rgb(254 202 202)');
    this.renderer.setStyle(element.indexEle, 'color', 'rgb(239 68 68)');
    this.renderer.setStyle(
      element.indexEle,
      'border',
      'solid 2px rgb(239 68 68)',
    );
  }

  checkPair() {
    if (!this.questionSelected || !this.answerSelected) return;
    if (this.questionSelected.value === this.answerSelected.value) {
      this.listIdsQuestionTrue.push(this.questionSelected.id!);
      this.truePair(this.questionEle);
      this.truePair(this.answerEle);
      this.isTrue = true;
      if (
        this.listIdsQuestionTrue.length === this.question.answerList?.length
      ) {
        this.isTrue$.emit(true);
      }
    } else {
      this.wrongPair(this.questionEle);
      this.wrongPair(this.answerEle);
      this.isTrue = false;
      this.isTrue$.emit(false);
    }
  }

  reset() {
    this.listIdsQuestionTrue = [];
    this.isTrue = true;
    this.answerSelected = null;
    this.questionSelected = new Answer();
  }
}

export class Element {
  ele: any;
  indexEle: any;
}
