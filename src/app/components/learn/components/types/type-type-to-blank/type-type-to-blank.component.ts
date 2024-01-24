import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  Renderer2,
  SimpleChanges,
} from '@angular/core';
import { Question } from '../../../../../models/question.models';
import { QuestionType } from '../../../../../enums/question.enums';

@Component({
  selector: 'app-type-type-to-blank',
  templateUrl: './type-type-to-blank.component.html',
  styleUrls: ['./type-type-to-blank.component.scss'],
})
export class TypeTypeToBlankComponent implements OnDestroy, OnChanges {
  @Input() questionNow: Question = new Question();
  @Input() answerNow: any;
  @Output() answerNow$: EventEmitter<any> = new EventEmitter();
  @Output() isSelected$: EventEmitter<boolean> = new EventEmitter();
  public answerType: string = '';
  constructor(private renderer: Renderer2) {}
  ngOnChanges(changes: SimpleChanges) {
    if ('questionNow' in changes) {
      this.answerType = '';
    }
  }
  ngOnDestroy() {
    this.answerType = '';
  }
  onInputChange(event: Event): void {
    const inputValue = (event.target as HTMLInputElement).value;
    if (inputValue.trim()) {
      this.isSelected$.emit(true);
      this.answerNow$.emit({
        value: this.answerType,
      });
    } else {
      this.isSelected$.emit(false);
    }
  }
}
