import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'see-question-selector',
  templateUrl: './question-selector.component.html',
  styleUrls: ['./question-selector.component.scss']
})
export class QuestionSelectorComponent {
  @Input() questionSetNames: string[];
  @Output() selectQuestionSetName = new EventEmitter<string>();

  constructor() { }

  public selectSet(name: string) {
    this.selectQuestionSetName.emit(name);
  }


}
