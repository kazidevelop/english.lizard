import { QuestionSet } from './../question-set.model';
import { Component, Input, Output, EventEmitter } from '@angular/core';

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

  public selectSet(set: QuestionSet) {
    this.selectQuestionSet.emit(set);
  }

  public addQuestionSet() {
    this.selectQuestionSet.emit();
  }

}
