import { Injectable } from '@angular/core';
import { QuestionSet } from './question-set.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { filterQueryId } from '@angular/core/src/view/util';


@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private questionSets: QuestionSet[];

  constructor(private httpClient: HttpClient) { }

  public loadQuestionSets(): Observable<QuestionSet[]> {
    // TODO fix hardcoded url....
    return this.httpClient.get<QuestionSet[]>('https://localhost:44377/api/questionSets');
  }

  public getQuestionSet(heading: string): Observable< QuestionSet> {

    return this.loadQuestionSets().pipe(
      map(res => {
        const item =  res.filter((d) => {
          return d.heading === heading;
        }).pop();
        return item;
      }));

  }


  public getQuestionNames(): Observable<string[]> {

    return this.loadQuestionSets().pipe(
      map(res => {
        return res.map(d => d.heading);
      })
    );

  }

}
