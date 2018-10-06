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
    clone.questions.forEach(question => {
      question.choices.sort(function (x, y) { return x === question.answer ? -1 : y === question.answer ? 1 : 0; });
      question.choiceLines = question.choices.join('\n');
    });
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

  private setQuestionSetAnswers() {
    // TODO move to function/class/service
    this.questionSet.questions.forEach(question => {
      const choices: string[] = [];
      if (question.choiceLines.length > 0) {
        const trimmedValue = question.choiceLines.trim();
        if (trimmedValue.length > 0) {
          const aValues = trimmedValue.split('\n');
          aValues.forEach(aValue => {
            const trimmedAValue = aValue.trim();
            if (trimmedAValue.length > 0) {
              choices.push(trimmedAValue);
            }
          });
        }
        if (choices.length > 0) {
          question.answer = choices[0];
        } else {
          question.answer = '';
        }
        question.choices = choices;
      }
    });
  }

  public onCloseQuestionEditor(option: DialogPopupOptions) {
    if (option === DialogPopupOptions.Yes) {
      this.setQuestionSetAnswers();
      this.questionService.saveQuestionSet(this.questionSet);
      console.log('TODO: notify question has been saved successfully');
    }
    this.questionSet = null;
  }

  public onSelectQuestionSet(set: QuestionSet) {
    this.questionSet = this.getQuestionSetClone(set);
  }

}
