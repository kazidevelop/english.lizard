import { Injectable } from '@angular/core';
import { QuestionSet } from './question-set.model';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { tap, map  , catchError} from 'rxjs/operators';
import { Question } from './question.model';
import {throwError } from 'rxjs';
import { Globals } from './shared.globals.model';


@Injectable({
  providedIn: 'root'
})
export class QuestionService {


  private questionSetUrl = `${environment.apiUrl}questionSets`;

  private loadedSets: QuestionSet[] = [];

  constructor(private httpClient: HttpClient) { }

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
         if ( !Globals.isSpelling(question.text)) { // TODO... move out???
          question.choices = this.doFisherYatesShuffle(question.choices);
         }
    });
    return this.doFisherYatesShuffle(questions);
  }


  public isCorrect(question: Question, selectedChoice: string): boolean {
    if (Globals.isSpelling(question.text)) {
      if (selectedChoice) {
        const formattedSelectedChoice = selectedChoice.trim().toLowerCase();
        return formattedSelectedChoice === question.answer.toLowerCase();
      }
      return false;
    }
    return selectedChoice === question.answer;
  }

  public saveQuestionSet (questionSet: QuestionSet): Observable<QuestionSet> {
    return this.httpClient.post<QuestionSet>(this.questionSetUrl, questionSet)
      .pipe(
        catchError(this.handleError) // ('saveQuestionSet', questionSet)
      );
  }



  /** DELETE: delete the question set from the server */
  public deleteQuestionSet (id: number): Observable<{}> {
  const url = `${this.questionSetUrl}/${id}`; // DELETE api/heroes/42
  return this.httpClient.delete(url)
    .pipe(
      catchError(this.handleError) // ('deleteQuestionSet')
    );
}

private handleError(error: HttpErrorResponse ) {
  if (error.error instanceof ErrorEvent) {
    // A client-side or network error occurred. Handle it accordingly.
    console.error('An error occurred:', error.error.message);
  } else {
    // The backend returned an unsuccessful response code.
    // The response body may contain clues as to what went wrong,
    console.error(
      `Backend returned code ${error.status}, ` +
      `body was: ${error.error}`);
  }
  // return an observable with a user-facing error message
  return throwError(
    'Something bad happened; please try again later.');
}

  public getNewQuestionSet(): QuestionSet {
    const questionSetCount = this.loadedSets.length + 1;
    return { id: 0 , heading: `new question set ${questionSetCount}`, questions: [this.getNewQuestion(0)] };
  }

  public getNewQuestion(count: number): Question {
    const newCount = count + 1;
    const question: Question = {
      id: 0,
      text: `new question ${newCount}`,
      answer: 'choice1',
      choices: ['choice1', 'choice2', 'choice3', 'choice4'],
      choiceLines: 'choice1\r\nchoice2\r\nchoice3\r\nchoice4', // tooltip?
    };
    return question;
  }

  public getQuestionSets(refresh: boolean = false ): Observable<QuestionSet[]> {

    if (this.loadedSets.length > 0  && !refresh) {
      return of(this.loadedSets);
    }
    return this.httpClient.get<QuestionSet[]>(this.questionSetUrl).pipe(
      map(val => val),
      tap(val => this.loadedSets = val)
    );
  }

}
