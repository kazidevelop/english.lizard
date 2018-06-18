import { Injectable } from '@angular/core';
import { QuestionSet } from './question-set.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private apiUrl = environment.apiUrl; // TODO move to config...

  constructor(private httpClient: HttpClient) { }


  public getQuestionSets(): Observable<QuestionSet[]> {
    return this.httpClient.get<QuestionSet[]>(`${this.apiUrl}questionSets`);
  }

}
