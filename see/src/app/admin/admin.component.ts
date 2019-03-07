import { QuestionSet } from './../shared/question-set.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { QuestionService } from '../shared/question.service';
import { DialogPopupOptions } from './question-editor/dialog-data.model';
@Component({
  selector: 'see-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit, OnDestroy {
  private unsubscribe = new Subject();
  constructor(private questionService: QuestionService) {
  }

  public questionSet: QuestionSet = null;
  public questionSets: QuestionSet[];

  public addNewQuestionSet() {
    this.questionSet = this.questionService.getNewQuestionSet();
  }

  public getQuestionSetClone(set: QuestionSet): QuestionSet {
    const clone = (JSON.parse(JSON.stringify(set)));
    return clone;
  }

  public ngOnInit() {
    this.questionService.getQuestionSets()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(questionSets => {
        this.questionSets = questionSets;
      });
  }

  public ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  public onCloseQuestionEditor(option: DialogPopupOptions) {
    if (option === DialogPopupOptions.Yes) {
      this.questionService.saveQuestionSet(this.questionSet);
      console.log('TODO: notify question has been saved successfully');
    }
    this.questionSet = null;
  }

  public onSelectQuestionSet(set: QuestionSet) {
    this.questionSet = this.getQuestionSetClone(set);
  }

}
