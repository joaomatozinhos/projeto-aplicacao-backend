import { Component, Inject, OnInit } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-snackbar-simple',
  templateUrl: './snackbar-simple.component.html',
  styleUrls: ['./snackbar-simple.component.css'],
})
export class SnackbarSimpleComponent implements OnInit {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {}

  ngOnInit() {}

  public getIcon() {
    switch (this.data.snackType) {
      case 'Success':
        return 'done';
      case 'Error':
        return 'error';
      case 'Warn':
        return 'warning';
      case 'Info':
        return 'info';
      default:
        return '';
    }
  }
}
