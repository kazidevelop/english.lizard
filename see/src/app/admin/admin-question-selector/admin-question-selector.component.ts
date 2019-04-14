import { Component, Input, Output, EventEmitter } from '@angular/core';
import { QuestionSet } from 'src/app/shared/question-set.model';
import { DialogAdminComponent } from '../dialog/admin-dialog.component';
import { AdminDialogPopupOptions } from '../dialog/admin-dialog-options.model';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'see-admin-question-selector',
  templateUrl: './admin-question-selector.component.html',
  styleUrls: ['./admin-question-selector.component.scss']
})
export class AdminQuestionSelectorComponent {
  @Input() questionSets: QuestionSet[];
  @Input() contextColour: string;
  @Output() selectQuestionSet = new EventEmitter<QuestionSet>();
  @Output() deleteQuestionSet = new EventEmitter<QuestionSet>();


  constructor(public dialog: MatDialog) { }

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

  public trackByFn(index: number, set: QuestionSet): number {
    return set.id;
  }


  public deleteSet(event: Event , set: QuestionSet) {
    event.cancelBubble = true;
    const dialogRef = this.dialog.open(DialogAdminComponent, {
      data: { name: set.heading }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== AdminDialogPopupOptions.Cancel) {
        this.deleteQuestionSet.emit(set);
      }
    });
  }

  public addQuestionSet() {
    this.selectQuestionSet.emit();
  }

}
