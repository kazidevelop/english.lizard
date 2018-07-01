import { Injectable } from '@angular/core';
import { QuestionSet } from './question-set.model';
import { Observable, observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { tap, map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private apiUrl = environment.apiUrl; // TODO move to config...

  private loadedSets: QuestionSet[] = [];

  constructor(private httpClient: HttpClient) { }


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
