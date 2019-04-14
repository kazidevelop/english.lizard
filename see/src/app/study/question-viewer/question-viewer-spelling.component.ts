import { Component, Input, EventEmitter, Output, OnInit, OnChanges, ViewChild, ElementRef } from '@angular/core';
import { Question } from './question.model';

@Component({
  selector: 'see-question-viewer-spelling',
  templateUrl: './question-viewer-spelling.component.html',
  styleUrls: ['./question-viewer-spelling.component.scss']

})

export class QuestionViewerSpellingComponent implements OnChanges {
   @Input() question: Question;
   @Output() answered = new EventEmitter<string>();
   public selectedChoice: string;
   @ViewChild('audioOption') audioPlayerRef: ElementRef;

  ngOnChanges() {
    this.selectedChoice = '';
    if( this.audioPlayerRef.nativeElement){
      this.audioPlayerRef.nativeElement.src =  this.question.choices[2];
    }
   
  }

  public textInputChanged() { // TODO ... delays... wait...
    this.answered.emit(this.selectedChoice);
  }

}
