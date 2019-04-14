import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Question } from './question.model';

@Component({
  selector: 'see-question-viewer-choice',
  templateUrl: './question-viewer-choice.component.html',
  styleUrls: ['./question-viewer-choice.component.scss']

})

export class QuestionViewerChoiceComponent  {
   @Input() question: Question;
   @Output() answered = new EventEmitter<string>();

   public selectedChoice: string;

  public choiceChanged() {
    this.answered.emit(this.selectedChoice);
  }
}

