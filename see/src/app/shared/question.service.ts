import { Injectable } from '@angular/core';
import { QuestionSet } from './question-set.model';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { tap, map } from 'rxjs/operators';
import { Question } from './question.model';
@Injectable({
  providedIn: 'root'
})
export class QuestionService {



  private apiUrl = environment.apiUrl; // TODO move to config...

  private loadedSets: QuestionSet[] = [];

  constructor(private httpClient: HttpClient) { }

  public saveQuestionSet(questionSet: QuestionSet): any {
    this.httpClient.post<QuestionSet>(`${this.apiUrl}questionSets`, questionSet).subscribe();
  }

  public getNewQuestionSet(): QuestionSet {
    const questionSetCount = this.loadedSets.length + 1;
    return { id: 0 , heading: 'new question set ' + questionSetCount, questions: [this.getNewQuestion(0)] };
  }

  public getNewQuestion(count: number): Question {
    const newCount = count + 1;
    const question: Question = {
      id: 0,
      text: 'new question ' + newCount,
      answer: 'choice1',
      choices: ['choice1', 'choice2', 'choice3', 'choice4'],
      choiceLines: 'choice1\r\nchoice2\r\nchoice3\r\nchoice4' // tooltip?
    };
    return question;
  }


  public getQuestionSets(): Observable<QuestionSet[]> {

    if (this.loadedSets.length > 0) {
      return of(this.loadedSets);
    }
    return this.httpClient.get<QuestionSet[]>(`${this.apiUrl}questionSets`).pipe(
      map(val => val),
      tap(val => this.loadedSets = val)
    );
  }

}
