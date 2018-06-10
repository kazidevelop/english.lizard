import { Component, OnInit } from '@angular/core';

import { QuestionService } from './question.service';
import { QuestionSet } from './question-set.model';

@Component({
  selector: 'see-root',
  templateUrl: './see.component.html',
  styleUrls: ['./see.component.css']
})
export class SeeComponent implements OnInit {
  title = 'see';

  constructor(private questionService: QuestionService) {
  }

  public questionSet: QuestionSet;
  public questionSetNames: string[];

  ngOnInit(): void {
    this.questionSetNames = this.questionService.GetQuestionNames();
  }

  public onCloseQuestionViewer() {
    this.questionSet = undefined;
  }

  public onSelectQuestionSetName(setName: string) {
    this.questionSet = this.questionService.GetQuestionSet(setName);
  }

}
