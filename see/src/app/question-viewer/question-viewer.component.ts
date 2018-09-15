import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { QuestionSet } from '../question-set.model';
import { Question } from '../question.model';



@Component({
  selector: 'see-question-viewer',
  templateUrl: './question-viewer.component.html',
  styleUrls: ['./question-viewer.component.scss']
})
export class QuestionViewerComponent implements OnInit {
  @Input() questionSet: QuestionSet;
  @Output() closeQuestionViewer = new EventEmitter();

  public question: Question;
  public state: 'answered' | 'checked' | 'unanswered' | 'finished';
  public barStyle: 'bar-unanswered' | 'bar-wrong' | 'bar-correct';
  public barButtonStyle: 'bar-button-unanswered' | 'bar-button-wrong' | 'bar-button-correct';

  public currentQuestionIndex = -1;
  public isLast: boolean;
  public isCorrect: boolean;
  public selectedChoice: string;

  @ViewChild('questionForm') questionForm: NgForm;

  constructor() { }

  public selectChoice() {
    this.state = 'answered';
  }

  private isLastQuestion(): boolean {
    const lastQuestionInSet = this.questionSet.questions.length;
    return lastQuestionInSet - 1 === this.currentQuestionIndex;
  }

  public check() {
    this.state = 'checked';
    this.isCorrect = this.selectedChoice === this.question.answer;
    this.barStyle = this.isCorrect ? 'bar-correct' : 'bar-wrong';
    this.barButtonStyle = this.isCorrect ? 'bar-button-correct' : 'bar-button-wrong';
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

  ngOnInit() {
    this.loadQuestion();
  }
}
