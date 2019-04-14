import { Component, OnInit, ViewChild, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { NgForm } from '@angular/forms';
import { QuestionSet } from '../../shared/question-set.model';
import { Question } from '../../shared/question.model';
import { stateTypes } from './statetype.model';
import { Globals } from 'src/app/shared/shared.globals.model';
import { QuestionService } from 'src/app/shared/question.service';


@Component({
  selector: 'see-question-viewer',
  templateUrl: './question-viewer.component.html',
  styleUrls: ['./question-viewer.component.scss']
})
export class QuestionViewerComponent implements  OnChanges {
  @Input() questionSet: QuestionSet;
  @Output() closeQuestionViewer = new EventEmitter();

  public question: Question;
  public state: stateTypes;
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

  constructor(private questionService: QuestionService) { }

  public onQuestionAnswered(answer: string) {

    this.state = (answer && answer.length > 0) ? 'answered' :  'unanswered';
    this.selectedChoice = answer;
  }

  public isSpelling(text: string) {
    return Globals.isSpelling(text);
  }

  private isLastQuestion(): boolean {
    if (this.numberOfQuestions === 1) {
      return true;
    }
    return this.numberOfQuestions - 1 === this.currentQuestionIndex;
  }

  private setResultValues() {
    this.barStyle = this.isCorrect ? 'bar-correct' : 'bar-wrong';
    this.barButtonStyle = this. isCorrect ? 'bar-button-correct' : 'bar-button-wrong';
    if (this.isCorrect) {
      ++this.correct;
    }
  }

  public check() {
    if (this.state === 'answered') {
      this.isCorrect = this.questionService.isCorrect(this.question, this.selectedChoice);
      this.actualQuestionProgress += this.questionProgressJumps;
      this.questionProgress = Math.round(this.actualQuestionProgress);
      this.state = 'checked';
      this.setResultValues();
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
    this.selectedChoice =  null;
    this.question = this.questionSet.questions[this.currentQuestionIndex];
  }

  ngOnChanges() {
    if (this.questionSet && this.questionSet.questions) {
      this.numberOfQuestions = this.questionSet.questions.length;
      this.questionProgressJumps = 100 / this.numberOfQuestions;
      this.loadQuestion();
    }

  }

}
