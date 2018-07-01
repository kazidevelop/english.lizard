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

  public questionSet: QuestionSet = null;
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

    const shallowClone = { ...item }; // shallow clone... Spread Syntax

    shallowClone.questions.forEach(question => {
      question.choices.sort(function (x, y) { return x === question.answer ? -1 : y === question.answer ? 1 : 0; });
      question.choiceLines = question.choices.join('\n');
    });

    return shallowClone;
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

  public onCloseQuestionEditor(heading: string) {

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

    let item = this.questionSets.filter((d) => {
      return d.heading === heading;
    })[0];

    item = { ...this.questionSet }; // shallow clone... Spread Syntax

    this.questionSet = null;
  }

  public onSelectQuestionSetName(setName: string) {
    this.questionSet = this.getQuestionSet(setName);
  }

}
