import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnDestroy, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { QuestionSet } from '../../question-set.model';
import { Question } from '../../question.model';


/** @title Responsive sidenav */
@Component({
  selector: 'see-question-editor',
  templateUrl: './question-editor.component.html',
  styleUrls: ['./question-editor.component.scss']
})
export class QuestionEditorComponent implements OnDestroy, OnChanges {

  public question: Question;
  public state: 'answered' | 'checked' | 'unanswered' | 'finished';
  public barStyle: 'bar-unanswered' | 'bar-wrong' | 'bar-correct';
  public barButtonStyle: 'bar-button-unanswered' | 'bar-button-wrong' | 'bar-button-correct';

  public currentQuestionIndex = -1;
  public correct = 0;
  public isLast: boolean;
  public isCorrect: boolean;
  public selectedChoice: string;
  public questionProgress = 0;
  mobileQuery: MediaQueryList;


  @Input() questionSet: QuestionSet;
  @Output() closeQuestionEditor = new EventEmitter<string>(); // TODO pass qusetionSet?


  @ViewChild('questionForm') questionForm: NgForm;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }


  private _mobileQueryListener: () => void;

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }



  public close() {
    this.closeQuestionEditor.emit(this.questionSet.heading);
  }


  public add() {
    const question: Question = {
      text: 'new question ' + this.questionSet.questions.length,
      answer: 'choice1',
      choices: ['choice1', 'choice2', 'choice3'],
      choiceLines: 'choice1\r\nchoice2\r\nchoice3' // tooltip?
    };
    this.questionSet.questions.push(question);
    this.currentQuestionIndex = this.questionSet.questions.length;
    this.loadQuestionByIndex();
  }

  public delete() {
    this.questionSet.questions.splice(this.currentQuestionIndex, 1);
    this.previous();
  }
  public previous() {
    --this.currentQuestionIndex;
    this.loadQuestionByIndex();
  }
  public next() {
    ++this.currentQuestionIndex;
    this.loadQuestionByIndex();
  }
  public loadQuestion(question) {
    this.question = question;
  }
  public loadQuestionByIndex() {
    if (this.currentQuestionIndex < 0) {
      this.currentQuestionIndex = 0;
    }
    if (this.currentQuestionIndex >= this.questionSet.questions.length) {
      this.currentQuestionIndex = this.questionSet.questions.length - 1;
    }

    this.loadQuestion(this.questionSet.questions[this.currentQuestionIndex]);
  }

  ngOnChanges() { // TODO on init...
    this.currentQuestionIndex = 0;
    this.loadQuestionByIndex();
  }

}
