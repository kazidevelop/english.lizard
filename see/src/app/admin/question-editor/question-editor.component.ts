import { DialogQuestionEditorComponent } from './dialog-question-editor.component';
import { Component, EventEmitter, Input, OnChanges, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { QuestionSet } from '../../shared/question-set.model';
import { Question } from '../../shared/question.model';
import { QuestionService } from '../../shared/question.service';
import { MatDialog } from '@angular/material';
import { DialogPopupOptions } from './dialog-data.model';


/** @title Responsive sidenav */
@Component({
  selector: 'see-question-editor',
  templateUrl: './question-editor.component.html',
  styleUrls: ['./question-editor.component.scss']
})
export class QuestionEditorComponent implements OnChanges {

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

  @Input() questionSet: QuestionSet;
  @Output() closeQuestionEditor = new EventEmitter<string>(); // TODO pass qusetionSet?
  @ViewChild('questionForm') questionForm: NgForm;

  constructor(private questionService: QuestionService, public dialog: MatDialog) {
  }

  public close() {
    const dialogRef = this.dialog.open(DialogQuestionEditorComponent, {
      data: { name: this.questionSet.heading }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== DialogPopupOptions.Cancel) {
        this.closeQuestionEditor.emit(result);
      }

    });
  }

  public add() {
    const question: Question = this.questionService.getNewQuestion(this.questionSet.questions.length);
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

