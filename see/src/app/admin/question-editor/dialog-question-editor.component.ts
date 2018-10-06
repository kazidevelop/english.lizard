import { Component, Inject } from '@angular/core';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import DialogData, { DialogPopupOptions } from './dialog-data.model';

@Component({
  selector: 'see-dialog-question-editor',
  templateUrl: './dialog-question-editor.component.html'
})
export class DialogQuestionEditorComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogQuestionEditorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  public onYesClick(): void {
    this.closeDialog(DialogPopupOptions.Yes);
  }

  public onNoClick(): void {
    this.closeDialog(DialogPopupOptions.No);
  }

  public onCancelClick(): void {
    this.closeDialog(DialogPopupOptions.Cancel);
  }

  closeDialog(option: DialogPopupOptions): void {
    this.dialogRef.close(option);
  }
}

