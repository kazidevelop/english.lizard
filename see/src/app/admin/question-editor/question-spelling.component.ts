import { Component, Input, ViewChild, ElementRef, OnChanges } from '@angular/core';
import { Question } from 'src/app/shared/question.model';
import { SeeDictionaryService } from './see-dictionary.service';

@Component({
  selector: 'see-question-spelling',
  templateUrl: './question-spelling.component.html',
  styleUrls: ['./question-spelling.component.scss']

})
export class SeeQuestionSpellingComponent implements OnChanges {
  constructor(private dictionary: SeeDictionaryService) {
  }

  @ViewChild('audioOption') audioPlayerRef: ElementRef;

  @Input() public question: Question;

  ngOnChanges() {
    if (this.question.choices[2].length > 0 ) {
      this.audioPlayerRef.nativeElement.src =  this.question.choices[2];
    }
  }

  public lookup() {
    this.dictionary.lookup(this.question.choices[0])
      .subscribe(result  => {
        let definition =  `${result.meaning} (${result.type})`;

        if ( result.example  && result.example.length > 0 ) {
          definition += `, example:  (${result.example})`;
        }
        this.question.choices[1] = definition;
        this.question.choices[2] = result.pronunciation;
        this.audioPlayerRef.nativeElement.src =  this.question.choices[2];
       });
  }
}

