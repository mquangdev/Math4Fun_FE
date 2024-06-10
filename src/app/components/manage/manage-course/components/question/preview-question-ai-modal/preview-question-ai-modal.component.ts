import { Component, OnInit, inject } from '@angular/core';
import { NZ_MODAL_DATA } from 'ng-zorro-antd/modal';
import { QuestionType } from 'src/app/enums/question.enums';
import { NotiService } from 'src/app/services/noti.service';

@Component({
  selector: 'app-preview-question-ai-modal',
  templateUrl: './preview-question-ai-modal.component.html',
  styleUrls: ['./preview-question-ai-modal.component.css'],
})
export class PreviewQuestionAiModalComponent implements OnInit {
  readonly data: {
    data: any;
    type: QuestionType;
  } = inject(NZ_MODAL_DATA);
  constructor(private noti: NotiService) {}

  ngOnInit() {
    this.noti.warning(
      'Vì có thể quá trình tự động tạo câu hỏi gặp sai số. Bạn hãy kiểm tra qua các câu hỏi được tạo tự động'
    );
  }
}
