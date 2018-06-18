import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'see-question-finish',
  templateUrl: './question-finish.component.html',
  styleUrls: ['./question-finish.component.scss']
})
export class QuestionFinishComponent implements OnInit {
  @Input() questionSetHeading: string;
  @Input() numberOfQuestions: number;
  @Input() correct: number;

  public isOverPassMark: boolean;

  ngOnInit() {
    this.isOverPassMark = (this.correct * 100) / this.numberOfQuestions > 50;
  }
}
