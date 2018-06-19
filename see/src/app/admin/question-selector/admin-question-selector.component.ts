import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'see-admin-question-selector',
  templateUrl: './admin-question-selector.component.html',
  styleUrls: ['./admin-question-selector.component.scss']
})
export class AdminQuestionSelectorComponent {
  @Input() questionSetNames: string[];
  @Output() selectQuestionSetName = new EventEmitter<string>();

  constructor() { }

  public selectSet(name: string) {
    this.selectQuestionSetName.emit(name);
  }


}
