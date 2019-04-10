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

  public reOrderQuestionsAndAnswers(rawSet: QuestionSet): QuestionSet {
     rawSet.questions = this.shuffleQuestions(rawSet.questions);
     return rawSet;
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
    this.questionSet = this.reOrderQuestionsAndAnswers(set);
  }

}
