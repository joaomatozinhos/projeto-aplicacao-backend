import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  constructor(private router: Router) {}

  public linkTo(url: string) {
    this.router.navigateByUrl(url);
  }

  public formatarData(data: any) {
    return new Date(`${data}T00:00`);
  }
}
