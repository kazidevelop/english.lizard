import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription, Subject } from 'rxjs';

import { QuestionService } from './question.service';
import { QuestionSet } from './question-set.model';
import { takeUntil } from 'rxjs/operators';
import { Question } from './question.model';


@Component({
  selector: 'see-root',
  templateUrl: './see.component.html',
  styleUrls: ['./see.component.css']
})
export class SeeComponent implements OnInit, OnDestroy {
  title = 'see';
  private unsubscribe = new Subject();
  constructor(private questionService: QuestionService) {
  }

  public questionSet = null;
  public questionSets: QuestionSet[];
  public questionSetNames: string[];

  // Fisher–Yates shuffle

  private doFisherYatesShuffle(inputArray: any[]): any[] {
    for (let i: number = inputArray.length - 1; i >= 0; i--) {
      const randomIndex: number = Math.floor(Math.random() * (i + 1));
      const itemAtIndex: number = inputArray[randomIndex];
      inputArray[randomIndex] = inputArray[i];
      inputArray[i] = itemAtIndex;
    }
    return inputArray;
  }


  private getQuestionSetNames(): string[] {
    return this.questionSets.
      map(d => d.heading);
  }

  public getQuestionSet(heading: string): QuestionSet {
    const item = this.questionSets.filter((d) => {
      return d.heading === heading;
    })[0];
    item.questions = this.shuffleQuestions(item.questions);
    return item;
  }

  private shuffleQuestions(questions: Question[]): Question[] {
    questions.forEach(question => {
      question.choices = this.doFisherYatesShuffle(question.choices);
    });
    return this.doFisherYatesShuffle(questions);
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
