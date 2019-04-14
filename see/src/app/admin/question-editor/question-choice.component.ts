import { Component, Input } from '@angular/core';
import { Question } from 'src/app/shared/question.model';

@Component({
  selector: 'see-question-choice',
  templateUrl: './question-choice.component.html',
  styleUrls: ['./question-choice.component.scss']

})
export class SeeQuestionChoiceComponent {
  @Input() question: Question;
   constructor() {
  }
}

