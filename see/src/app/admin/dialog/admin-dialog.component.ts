import { Component, Inject } from '@angular/core';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { AdminDialogPopupOptions } from './admin-dialog-options.model';
import AdminDialogData from './admin-dialog-data.model';

@Component({
  selector: 'see-admin-dialog',
  templateUrl: './admin-dialog.component.html'
})
export class DialogAdminComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogAdminComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AdminDialogData) { }

  public onYesClick(): void {
    this.closeDialog(AdminDialogPopupOptions.Yes);
  }

  public onCancelClick(): void {
    this.closeDialog(AdminDialogPopupOptions.Cancel);
  }

  closeDialog(option: AdminDialogPopupOptions): void {
    this.dialogRef.close(option);
  }
}

