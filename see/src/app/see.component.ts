import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Observable, Subscription, Subject } from 'rxjs';

import { QuestionService } from './shared/question.service';
import { QuestionSet } from './shared/question-set.model';
import { takeUntil } from 'rxjs/operators';
import { Question } from './shared/question.model';
import { Title } from '@angular/platform-browser';
import { MatSidenav } from '@angular/material';

@Component({
  selector: 'see-root',
  templateUrl: './see.component.html',
  styleUrls: ['./see.component.css']
})
export class SeeComponent implements OnInit, OnDestroy {
  title = 'Study.Learn.Ready.Love';
  private unsubscribe = new Subject();
  @ViewChild('drawer') public sidenav: MatSidenav;

  constructor(private questionService: QuestionService, private titleService: Title) {
  }
  public headerText = 'Study';
  public questionSet = null;
  public questionSets: QuestionSet[];

  public openPage(newTitle: string) {
    this.titleService.setTitle(newTitle);
    this.headerText = newTitle;
    this.sidenav.close();
  }

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
      });
  }

  public ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  public onCloseQuestionViewer() {
    this.questionSet = null;
  }

  public onSelectQuestionSet(set: QuestionSet) {
    this.questionSet = set;
  }

}
