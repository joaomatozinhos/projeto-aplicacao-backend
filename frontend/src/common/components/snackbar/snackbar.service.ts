import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarSimpleComponent } from './snackbar-simple/snackbar-simple.component';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  constructor(private snackBar: MatSnackBar) {}
  public openSnackBar(message: string, snackType?: string) {
    const _snackType: any = snackType !== undefined ? snackType : 'Success';

    this.snackBar.openFromComponent(SnackbarSimpleComponent, {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      data: { message: message, snackType: _snackType },
    });
  }
}
