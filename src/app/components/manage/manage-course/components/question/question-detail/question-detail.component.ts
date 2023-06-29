import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionType } from 'src/app/enums/question.enums';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-question-detail',
  templateUrl: './question-detail.component.html',
  styleUrls: ['./question-detail.component.scss'],
})
export class QuestionDetailComponent implements OnInit {
  public questionId!: string;
  public questionType!: QuestionType;
  public QuestionType = QuestionType;
  constructor(
    private questionService: QuestionService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.questionId = params['id'];
    });
    this.route.queryParams.subscribe((queryParams) => {
      this.questionType = queryParams['type'];
    });
    console.log(this.questionId, this.questionType);
  }
}
