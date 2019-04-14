import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import SeeDefinition from './see-definition.model';


@Injectable({
  providedIn: 'root'
})
export class SeeDictionaryService {

  constructor(private httpClient: HttpClient) { }



  public lookup(word: string): Observable<SeeDefinition> {
    const wordWithUrl = `${environment.dictionaryUrlPreix}${word}${environment.dictionaryUrlSuffix}`;
    return this.httpClient.get(wordWithUrl)
      .pipe(
        map(dataList => {
          const data = dataList[0];
          const obj: SeeDefinition = { word: '', pronunciation: '', meaning: '', type: '', example: '' };
          obj.word = data.word;
          obj.pronunciation = data.pronunciation;
          obj.type = this.getFirstWordType(data.meaning);
          const definition = data.meaning[obj.type][0];
          obj.meaning = definition.definition;
          obj.example = this.getValueOrEmptyString(definition.example);
          return obj;
        }
        ),
        catchError(this.handleError)
      );
  }
  
  private  getFirstWordType(obj: any) : string{
    for (let prop in obj){
        if (obj.hasOwnProperty(prop)) {
          return prop;
        }
    }
    return "";
  }

  private  getValueOrEmptyString(obj: any) : string
  {
    if(obj)
    {
      return obj;
    }
    else
    {
      return '';
    }
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status},` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }

}
