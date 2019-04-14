import { QuestionSet } from './../shared/question-set.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { QuestionService } from '../shared/question.service';
import { Question } from '../shared/question.model';

@Component({
  selector: 'see-study',
  templateUrl: './study.component.html',
  styleUrls: ['./study.component.css']
})
export class StudyComponent implements OnInit, OnDestroy {
  private unsubscribe = new Subject();
  constructor(private questionService: QuestionService) {
  }

  public questionSet = null;
  public questionSets: QuestionSet[];

   public ngOnInit() {
    this.questionService.getQuestionSets()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(questionSets => {
        this.questionSets =  questionSets;
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
    this.questionSet = this.questionService.reOrderQuestionsAndAnswers(set);
  }

}
