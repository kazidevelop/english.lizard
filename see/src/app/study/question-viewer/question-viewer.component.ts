import { Component, OnInit, ViewChild, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { NgForm } from '@angular/forms';
import { QuestionSet } from '../../shared/question-set.model';
import { Question } from '../../shared/question.model';


@Component({
  selector: 'see-question-viewer',
  templateUrl: './question-viewer.component.html',
  styleUrls: ['./question-viewer.component.scss']
})
export class QuestionViewerComponent implements OnInit, OnChanges {
  @Input() questionSet: QuestionSet;
  @Output() closeQuestionViewer = new EventEmitter();

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
  private actualQuestionProgress = 0;
  private questionProgressJumps = 0;
  public numberOfQuestions = 0;

  @ViewChild('questionForm') questionForm: NgForm;

  constructor() { }

  public selectChoice() {
    if (this.state === 'unanswered') { // radio disabled property binding not working https://github.com/angular/angular/issues/11763
      this.state = 'answered';
    }
  }

  private isLastQuestion(): boolean {
    return this.numberOfQuestions - 1 === this.currentQuestionIndex;
  }

  private setResultValues(isCorrect: boolean) {
    this.isCorrect = isCorrect;
    this.barStyle = isCorrect ? 'bar-correct' : 'bar-wrong';
    this.barButtonStyle = isCorrect ? 'bar-button-correct' : 'bar-button-wrong';
    if (isCorrect) {
      ++this.correct;
    }
  }

  public check() {
    if (this.state === 'answered') {
      this.actualQuestionProgress += this.questionProgressJumps;
      this.questionProgress = Math.round(this.actualQuestionProgress);
      this.state = 'checked';
      this.setResultValues(this.selectedChoice === this.question.answer);
    }
  }

  public close() {
    this.closeQuestionViewer.emit();
  }

  public finish() {
    this.state = 'finished';
  }

  private loadQuestion() {
    this.currentQuestionIndex = this.currentQuestionIndex + 1;
    this.state = 'unanswered';
    this.barStyle = 'bar-unanswered';
    this.barButtonStyle = 'bar-button-unanswered';
    this.isLast = this.isLastQuestion();
    this.question = this.questionSet.questions[this.currentQuestionIndex];
  }

  ngOnChanges() {
    if (this.questionSet && this.questionSet.questions) {
      this.loadQuestion();
    }

  }

  ngOnInit() {
    this.numberOfQuestions = this.questionSet.questions.length;
    this.questionProgressJumps = 100 / this.numberOfQuestions;
  }
}
