import { QuestionSet } from './../question-set.model';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { I18nPluralPipe } from '@angular/common';

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
      '=0' : 'Empty Set',
      '=1' : '1 Question',
      'other' : '# Questions'
    }
  };

  public selectSet(set: QuestionSet) {
    this.selectQuestionSet.emit(set);
  }

  public deleteSet(set: QuestionSet) {
   event.cancelBubble = true;
  }
  public addQuestionSet() {
    this.selectQuestionSet.emit();
  }

}
