import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { QuestionSet } from '../question-set.model';
import { QuestionService } from '../question.service';

@Component({
  selector: 'see-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit, OnDestroy {
  private unsubscribe = new Subject();
  constructor(private questionService: QuestionService) {
  }

  public questionSet = null;
  public questionSets: QuestionSet[];
  public questionSetNames: string[];



  private getQuestionSetNames(): string[] {
    return this.questionSets.
      map(d => d.heading);
  }

  public getQuestionSet(heading: string): QuestionSet {
    const item = this.questionSets.filter((d) => {
      return d.heading === heading;
    })[0];
    return item;
  }

  public ngOnInit() {
    this.questionService.getQuestionSets()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(questionSets => {
        this.questionSets = questionSets;
        this.questionSetNames = this.getQuestionSetNames();
      });
  }

  public ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  public onCloseQuestionViewer() {
    this.questionSet = null;
  }

  public onSelectQuestionSetName(setName: string) {
    this.questionSet = this.getQuestionSet(setName);
  }

}
