
import { MatDialog } from '@angular/material';

export default interface DialogData {
  animal: string;
  name: string;
}


export enum DialogPopupOptions {
  Cancel = 0,
  No,
  Yes,
}
