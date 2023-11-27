import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  constructor(private router: Router, private snackBar: MatSnackBar) {}

  public linkTo(url: string) {
    this.router.navigateByUrl(url);
  }

  public openSnackBar(msg: string) {
    this.snackBar.open(`${msg}`, '', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 3 * 1000,
    });
  }

  public formatarData(data: any) {
    return new Date(`${data}T00:00`);
  }
}
