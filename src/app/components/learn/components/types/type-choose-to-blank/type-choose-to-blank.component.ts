import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  Renderer2,
  SimpleChanges,
} from '@angular/core';
import { Answer, Question } from '../../../../../models/question.models';
import { QuestionType } from '../../../../../enums/question.enums';

@Component({
  selector: 'app-type-choose-to-blank',
  templateUrl: './type-choose-to-blank.component.html',
  styleUrls: ['./type-choose-to-blank.component.scss'],
})
export class TypeChooseToBlankComponent implements OnChanges {
  @Input() questionNow: Question = new Question();
  @Input() answerNow: any;
  @Input() isChecked: boolean = false;
  @Input() isSelected: boolean = false;
  @Output() answerNow$: EventEmitter<any> = new EventEmitter();
  constructor(private renderer: Renderer2) {}
  ngOnChanges(changes: SimpleChanges): void {
    if (this.questionNow) {
      console.log(this.questionNow);
    }
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
      case QuestionType.chooseToBlank: {
        this.answerNow = answer;
        this.answerNow$.emit(this.answerNow);
        break;
      }
    }
  }
}
