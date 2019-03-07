import { Component, Input, Output, EventEmitter } from '@angular/core';
import { I18nPluralPipe } from '@angular/common';
import { QuestionSet } from 'src/app/shared/question-set.model';

@Component({
  selector: 'see-question-selector',
  templateUrl: './question-selector.component.html',
  styleUrls: ['./question-selector.component.scss']
})
export class QuestionSelectorComponent {
  @Input() questionSets: QuestionSet[];
  @Input() contextColour: string;
  @Output() selectQuestionSet = new EventEmitter<QuestionSet>();

  constructor() { }

  itemPluralMapping = {
    'question': {
      '=0': 'Empty Set',
      '=1': '1 Question',
      'other': '# Questions'
    }
  };

  public selectSet(set: QuestionSet) {
    this.selectQuestionSet.emit(set);
  }


}
