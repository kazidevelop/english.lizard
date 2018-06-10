import { Injectable } from '@angular/core';
import { QuestionSet } from './question-set.model';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private questionSets =
    [
      {
        heading: 'Std. 3 Science',
        questions:
          [
            {

              text: 'The best soil for modelling is?',
              answer: 'clay',
              choices:
                ['clay', 'loam', 'silt', 'sand'],
            },
            {

              text: 'Heavy rain causes',
              answer: 'flood',
              choices:
                ['famine', 'drought', 'flood'],
            },
            {

              text: 'When will the shadow be the shortest',
              answer: 'noon',
              choices:
                ['morning', 'noon', 'evening', 'night'],
            },
            {

              text: '____ is a method of separating chaff from maize',
              answer: 'winnowing',
              choices:
                ['blowing', 'flying', 'winnowing'],
            },
            {

              text: 'Which of the following plants provides us with oil?',
              answer: 'coconut',
              choices:
                ['coconut', 'cotton', 'carrot', 'cabbage'],
            }
          ]
      },
      {
        heading: 'Naplan Year 5',
        questions:
          [
            {

              text: '5427 / 9 = ___ ',
              answer: '603',
              choices:
                ['63', '603', '630', '6003'],
            },
            {

              text: '4 X ___ = 8 X 3',
              answer: '6',
              choices:
                ['4', '6', '8'],
            },
            {

              text: 'Which number is greater than 0.08',
              answer: '0.1',
              choices:
                ['0.1', '0.009', '0.07', '0.0089'],
            }
          ]
      }

    ];

  constructor() { }


  public GetQuestionSet(heading: string): QuestionSet {
    return this.questionSets.filter((d) => {
      return d.heading === heading;
    })[0]; // assume that item will always be found
  }


  public GetQuestionNames(): string[] {
    return this.questionSets.map((d) => {
      return d.heading;
    });
  }

}
