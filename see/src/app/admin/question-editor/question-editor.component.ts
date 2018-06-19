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
  @Output() closeQuestionViewer = new EventEmitter();


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

  public choicesAsLines(choices: string[]) {
    return choices.join('\r\n')
      ;
  }

  public close() {
    this.closeQuestionViewer.emit();
  }

  public loadQuestion(question) {

    this.question = question;
  }

  ngOnChanges() {
    this.loadQuestion(this.questionSet.questions[0]);
  }

}
