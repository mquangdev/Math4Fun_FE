import {
  Component,
  EventEmitter,
  Input,
  Output,
  Renderer2,
} from '@angular/core';
import { QuestionType } from 'src/app/enums/question.enums';

@Component({
  selector: 'app-type-choose-answer',
  templateUrl: './type-choose-answer.component.html',
  styleUrls: ['./type-choose-answer.component.scss'],
})
export class TypeChooseAnswerComponent {
  @Input() questionNow: any;
  @Input() answerNow: any;
  @Input() isChecked: boolean = false;
  @Input() isSelected: boolean = false;
  @Output() answerNow$: EventEmitter<any> = new EventEmitter();
  constructor(private renderer: Renderer2) {}
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
        this.answerNow$.emit(this.answerNow);
        break;
      }
    }
  }
}
